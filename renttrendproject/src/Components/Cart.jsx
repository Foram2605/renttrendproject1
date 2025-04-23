import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculatetotal, emptycart, removefromcart, selectCart } from '../redux/cartSlice'
import { BsTrash } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router'

const Cart = () => {
    const cartItems = useSelector(selectCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        dispatch(calculatetotal())
    }, [cartItems])

    const calculateRentalDays = (item) => {
        if (item.BookingDate && item.returnDate) {
            const BookingDate = new Date(item.BookingDate)
            const returnDate = new Date(item.returnDate)
            const diffInMs = returnDate - BookingDate
            const rentalDays = Math.max(diffInMs / (1000 * 60 * 60 * 24), 0)
            return rentalDays || 1 
        }
        return 1
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const rentalDays = calculateRentalDays(item)
        return sum + rentalDays * item.price
    }, 0)

    const deposit = subtotal * 0.3
    const finalTotal = subtotal + deposit

    const handleCheckout = () => {
        if (sessionStorage.getItem("renttrend") !== null) {
            navigate('/checkout')
        } else {
            navigate('/login', { state: { path: location.pathname } })
        }
    }

    return (
        <div className='container-fluid mt-5 shadow p-4'>
            <h1>Shopping Cart</h1><hr />
            <div className="row">
                <div className="col-8">
                    <div className="table-responsive card p-2">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr. No</th>
                                    <th>Product</th>
                                    <th>Booking Date</th>
                                    <th>Return Date</th>
                                    <th>Total Days</th>
                                    <th>Price Per Day</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 && (
                                    <tr>
                                        <td colSpan={8}>No Item in Cart</td>
                                    </tr>
                                )}
                                {cartItems.map((item, index) => {
                                    const rentalDays = calculateRentalDays(item)
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img 
                                                    src={item.images[0]} 
                                                    alt={item.name} 
                                                    height="100px" 
                                                    width={100} 
                                                    style={{ objectFit: 'cover' }} 
                                                />
                                                <div>{item.name}</div>
                                            </td>
                                            <td>{item.BookingDate || 'N/A'}</td>
                                            <td>{item.returnDate || 'N/A'}</td>
                                            <td>{rentalDays}</td>
                                            <td>&#8377;{item.price.toFixed(2)}</td>
                                            <td>&#8377;{(rentalDays * item.price).toFixed(2)}</td>
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className='btn btn-danger' 
                                                    onClick={() => dispatch(removefromcart(item.id))}
                                                >
                                                    <BsTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col">
                    <div className='card p-2'>
                        <h4>Order Summary</h4> <hr />
                        <h5>Sub Total : <span className='float-end'>&#8377; {subtotal.toFixed(2)}</span></h5><br />
                        <h6 className='bg-warning text-dark p-2 rounded'>
                            Deposit : <span className='float-end'>&#8377; {deposit.toFixed(2)}</span>
                        </h6>
                        <p className="text-danger small">* Deposit is mandatory</p>
                        <br />
                        <h6>Shipping : <span className='float-end'>{subtotal > 200   && subtotal < 2000 ? ".100" : "free shipping"}</span></h6><hr />
                        <h5>Total : <span className='float-end'>&#8377; {finalTotal.toFixed(2)}</span></h5><br />
                        <div className="d-flex justify-content-between">
                            <button type="button" className='btn btn-danger btn-lg' onClick={() => dispatch(emptycart())}>
                                <BsTrash /> Empty Cart
                            </button>
                            <button type="button" className='btn btn-info btn-lg' onClick={handleCheckout} disabled={cartItems.length === 0}>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
