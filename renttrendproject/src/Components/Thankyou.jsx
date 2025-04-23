import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router'

const Thankyou = () => {
  return (
    <div className='container flex-column d-flex justify-content-center align-items-center text-danger ' 
    style={{height:'100%'}}>
        <h1>Thank you for ordering from us</h1>
        <Link to='/'><FaArrowAltCircleLeft /> Continue Shopping</Link>
    </div>
  )
}

export default Thankyou