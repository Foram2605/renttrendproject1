import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCart)

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

  return (
    <Card className='p-2'>
      <h1>Checkout Summary</h1>
      <hr />
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Products: </strong>({cartItems.length})
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Sub Total: </strong>&#8377;{subtotal.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Deposit: </strong>&#8377;{deposit.toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total Price: </strong>&#8377;{finalTotal.toFixed(2)}
          </ListGroup.Item>
        </ListGroup>
        <hr />
        {cartItems.map((item, index) => {
          const rentalDays = calculateRentalDays(item)
          return (
            <ListGroup key={index} className="mb-2">
              <ListGroup.Item>
                <strong>Product Name: </strong>{item.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price per Day: </strong>&#8377;{item.price.toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Booking Date: </strong>{item.BookingDate || 'N/A'}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Return Date: </strong>{item.returnDate || 'N/A'}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total Days: </strong>{rentalDays}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total Price: </strong>
                &#8377;{(rentalDays * item.price).toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export default CheckoutSummary