import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Table, Card, Button, Row, Col } from 'react-bootstrap'
import { selectorders } from '../../redux/orderSlice'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { BsBoxSeam } from 'react-icons/bs'
import { MdDateRange, MdAttachMoney } from 'react-icons/md'
import ChangeOrderStatus from './ChangeOrderStatus'

const SupOrderDetails = () => {
    const { id } = useParams()
    const orders = useSelector(selectorders)
    const order = orders.find((item) => item.id == id)

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

    // Calculate Subtotal (Total rental price of all items)
    const subtotal = order.cartItems.reduce((sum, item) => {
        const rentalDays = calculateRentalDays(item)
        return sum + rentalDays * item.price
    }, 0)

    // Deposit Calculation (30% of subtotal)
    const deposit = subtotal * 0.3

    // Final Total (Subtotal + Deposit)
    const finalTotal = subtotal + deposit

    return (
        <div className="container my-4">
            <Card className="shadow-lg p-4">
                <h2 className="text-primary mb-3">
                    <BsBoxSeam className="me-2" /> Order Details
                </h2>
                <hr />

                <Row className="mb-3">
                    <Col md={6}>
                        <h4 className="text-info">
                            <ChangeOrderStatus order={order} />
                        </h4>
                    </Col>
                    <Col md={6} className="text-end">
                        <Link to="/supplier/suporder">
                            <Button variant="primary">
                                <FaArrowCircleLeft className="me-1" /> Back to Orders
                            </Button>
                        </Link>
                    </Col>
                </Row>

                {/* Shipping Details */}
                <Card className="p-3 mb-4">
                    <h5 className="fw-bold">Shipping Address</h5>
                    <p>
                        <b>Name:</b> {order.shippingAddress.name}<br />
                        <b>Address:</b> {order.shippingAddress.address1}, {order.shippingAddress.city}<br />
                        <b>Pincode:</b> {order.shippingAddress.pincode}<br />
                        <b>Contact:</b> {order.shippingAddress.mobile}
                    </p>
                </Card>

                {/* Order Items Table */}
                <Table striped bordered hover responsive>
                    <thead className="bg-light">
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th> Price Per Day</th>
                            <th><MdDateRange className="me-1" /> Booking Date</th>
                            <th><MdDateRange className="me-1" /> Return Date</th>
                            <th>Total Days</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.cartItems.map((item, index) => {
                            const rentalDays = calculateRentalDays(item)
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={item.images[0]} height={50} width={50} className="rounded" />
                                    </td>
                                    <td>&#8377; {item.price.toFixed(2)}</td>
                                    <td>{item.BookingDate || 'N/A'}</td>
                                    <td>{item.returnDate || 'N/A'}</td>
                                    <td>{rentalDays}</td>
                                    <td>&#8377; {(rentalDays * item.price).toFixed(2)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                {/* Order Summary */}
                <Card className="p-3 mt-3">
                    <h4 className="fw-bold text-secondary">Order Summary</h4>
                    <hr />
                    <Row>
                        <Col className="text-end fw-bold">Subtotal:</Col>
                        <Col className="text-end">&#8377; {subtotal.toFixed(2)}</Col>
                    </Row>
                    <Row className="text-warning">
                        <Col className="text-end fw-bold">Deposit (30%):</Col>
                        <Col className="text-end">&#8377; {deposit.toFixed(2)}</Col>
                    </Row>
                    <hr />
                    <Row className="text-success">
                        <Col className="text-end fw-bold fs-5">Final Total:</Col>
                        <Col className="text-end fs-5">&#8377; {finalTotal.toFixed(2)}</Col>
                    </Row>
                </Card>
            </Card>
        </div>
    )
}

export default SupOrderDetails
