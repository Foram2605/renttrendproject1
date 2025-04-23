import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getData } from './api'
import { selectorders, store_orders } from '../redux/orderSlice'
import { toast } from 'react-toastify'
import { Container, Table, Button, Badge } from 'react-bootstrap'

const MyOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/orders`)
      .then((res) => dispatch(store_orders(res)))
      .catch((err) => toast.error(err.message))
  }, [])

  const allorders = useSelector(selectorders)
  const { username } = JSON.parse(sessionStorage.getItem('renttrend')) || {}
  const orders = allorders.filter((item) => item.username === username)

  return (
    <Container fluid className=" p-4" style={{ backgroundColor: '#f9f9f9' }}>
      <h2 className="mb-4 text-center" style={{ color: '#5f1f43', fontWeight: '600' }}>My Orders</h2>
      <Table striped bordered hover responsive className="mt-3">
      <thead style={{ backgroundColor: '#5f1f43', color: '#ffffff' }}>
          <tr>
            <th>OrderId</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Order Date and Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-muted">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index} className="align-middle">
                <td>#{order.id}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {`${order.orderDate.split('/')[1].padStart(2, '0')}-${order.orderDate.split('/')[0].padStart(2, '0')}-${order.orderDate.split('/')[2]}`} at {order.orderTime}
                </td>
                <td>
                  {order.orderStatus !== 'delivered' ? (
                    <Badge bg="danger">{order.orderStatus}</Badge>
                  ) : (
                    <Badge bg="success">{order.orderStatus}</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/myorders/details/${order.id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default MyOrders
