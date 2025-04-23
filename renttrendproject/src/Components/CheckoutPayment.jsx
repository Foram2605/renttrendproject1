import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { emptycart, selectCart, selectTotal } from '../redux/cartSlice'
import { selectAddress } from '../redux/checkoutSlice'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripePayment from './StripePayment'

const stripePromise = loadStripe(`${import.meta.env.VITE_PK}`)

const CheckoutPayment = () => {
    const [paymentMethod,setPaymentMethod] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const navigate =  useNavigate()
    const dispatch =  useDispatch()

    const cartItems =  useSelector(selectCart)
    const total =  useSelector(selectTotal)
    console.log(total)
    const shippingAddress =  useSelector(selectAddress)
    const {username , email} = JSON.parse(sessionStorage.getItem("renttrend"))
    const handleCODorder = async()=>{
        try{
            await axios.post(`${import.meta.env.VITE_BASE_URL}/orders` , {cartItems , total, username,email , 
                paymentMethod:'cod' , orderStatus:"placed" ,shippingAddress , orderDate:new Date().toLocaleDateString() , orderTime:new Date().toLocaleTimeString(), createdAt:new Date()
            })

            for (const item of cartItems) {
                const updatedStock = item.stock - 1;
                await axios.patch(`${import.meta.env.VITE_BASE_URL}/products/${item.id}`, {
                    stock: updatedStock < 0 ? 0 : updatedStock
                });
            }
            toast.success("order placed")
            navigate('/thankyou')     
            dispatch(emptycart())
        }
        catch(err){toast.error(err.messge)}
    }

    useEffect(()=>{
        if(paymentMethod=="online"){ handleonlinePayment()}
    },[paymentMethod])

    const handleonlinePayment = async()=>{
        try{
            const res= await fetch(`${import.meta.env.VITE_NODE_URL}/create-payment-intent` ,{
                method:"POST",
                headers:{'content-type':'application/json'},
                body :JSON.stringify({total}) } )
            const data =  await res.json()
            console.log(data)
            setClientSecret(data.clientSecret)
        }
        catch(err){toast.error(err.messge)}
    }

    if(cartItems.length != 0) {
        return (
            <Elements stripe={stripePromise}>
                <div className='container mt-5 shadow p-4'>
                    <div className="row">
                        <div className="col card">
                            <h1>Checkout Payment</h1><hr/>
                            <div className='list-group mb-4 p-4'>
                            <div className="mb-3 form-check">
                                <input type="radio" name="payment" value="cod" className='form-check-input'
                                onClick={()=>setPaymentMethod('cod')}/>
                                <label htmlFor="" className='form-check-label'>Cash On Delivery</label>
                            </div>
                            {paymentMethod=='cod' && 
                            <div>
                                <button type="button" className='btn btn-primary me-3' onClick={handleCODorder}>Place Order</button>
                                <button type="button" className='btn btn-danger me-3'>Cancel</button>
                            </div> }
                            </div>
                            <div className='list-group mb-4 p-4'>
                            <div className="mb-3 form-check">
                                <input type="radio" name="payment" value="online" className='form-check-input' onClick={()=>setPaymentMethod('online')}/>
                                <label htmlFor="" className='form-check-label'>Pay Online</label>
                            </div>
                            {(paymentMethod=="online" && clientSecret) && 
                            <div className='card p-2'>
                                <h3 className='mb-4'>Enter Payment Details</h3>
                                <StripePayment clientSecret={clientSecret} ></StripePayment>
                            </div>
                            }
                            </div>  
                        </div>
                        <div className="col"><CheckoutSummary/></div>
                    </div>
                </div>
            </Elements>
          )
    }
   else return <Navigate to='/'/> 
}

export default CheckoutPayment