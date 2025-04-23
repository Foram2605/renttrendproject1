import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { emptycart, selectCart, selectTotal } from '../redux/cartSlice'
import { selectAddress } from '../redux/checkoutSlice'

const StripePayment = ({clientSecret }) => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const stripe =  useStripe()
  const elements =  useElements()

  const [isLoading,setIsLoading] = useState(false)

  const cartItems =  useSelector(selectCart)
  const total =  useSelector(selectTotal)
  const shippingAddress =  useSelector(selectAddress)
  const {username , email} = JSON.parse(sessionStorage.getItem("renttrend"))

  const handlePayment = ()=>{
      setIsLoading(true)
      if(!stripe || !elements) {toast.error("stripe not initailzied");return}
      const cardelement =  elements.getElement(CardElement)
      stripe.confirmCardPayment(clientSecret , {
        payment_method :{card:cardelement}
      }).then((res)=>{
        console.log(res)
        if(res.paymentIntent){
          if(res.paymentIntent.status=='succeeded'){
            toast.success("payment done")
            saveorder()
          }
        }
        setIsLoading(false)
      }).catch(err=>{toast.error(err.message) ; setIsLoading(false)})
  }

  const saveorder = async()=>{
    try{
      await axios.post(`${import.meta.env.VITE_BASE_URL}/orders` , {cartItems , total, username,email , 
          paymentMethod:'online' , orderStatus:"placed" , orderDate:new Date().toLocaleDateString() , orderTime:new Date().toLocaleTimeString() ,shippingAddress ,  createdAt:new Date()
      })
      toast.success("order placed")
      dispatch(emptycart())
      navigate('/thankyou')     

  }
  catch(err){toast.error(err.messge)}
  }
  return (
    <>
    <CardElement className='mb-3'/>
    <div class="d-grid gap-2">
      <button  type="button"  class="btn btn-primary"  onClick={handlePayment}  >
        {isLoading ?   <div class="spinner-border text-light" role="status"></div> :" (Pay Now)"}
      </button>
    </div>
    
    </>
  )
}

export default StripePayment