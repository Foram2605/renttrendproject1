import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import CheckoutSummary from './CheckoutSummary';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, store_address } from '../redux/checkoutSlice';
import { selectCart } from '../redux/cartSlice';

const Checkout = () => {
  const navigate =  useNavigate()
  const obj = {
    name: '',  mobile: '',   address1: '',  address2: '',city: '',  state: '',   country: '',  pincode: '' }
  const dispatch =  useDispatch()
    const [shippingAddress, setShippingAddress] = useState({...obj});
    
      const handleCheckout = (e) => {
        e.preventDefault();
        let {mobile, city, pincode} =  shippingAddress
        if(!mobile || !city || !pincode){toast.error("please provide info")}
        else {
          dispatch(store_address(shippingAddress))
          navigate('/checkoutpayment')
        }
      };
      const cartItems =  useSelector(selectCart)
      const address =  useSelector(selectAddress)
      useEffect(()=>{
        if(address){setShippingAddress({...address})}
        else setShippingAddress({...obj})
      },[])

      if(cartItems.length !=0){
  return (
    <Container className="mt-4">
    <Row className="mt-5">
      <Col>
        <Card className="shadow-lg p-4">
          <Row>
            <Col md={6} className='p-2 border'>
              <h1 className="text-center mb-4">Checkout Details</h1>
              <hr />
              <Form onSubmit={handleCheckout}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" value={shippingAddress.name} onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control type="text" placeholder="Enter mobile number" value={shippingAddress.mobile} onChange={(e) => setShippingAddress({...shippingAddress, mobile: e.target.value})} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Address1</Form.Label>
                      <Form.Control type="text" value={shippingAddress.address1} onChange={(e) => setShippingAddress({...shippingAddress, address1: e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Address2</Form.Label>
                      <Form.Control type="text" value={shippingAddress.address2} onChange={(e) => setShippingAddress({...shippingAddress, address2: e.target.value})} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Country</Form.Label>
                      <Form.Control type="text" value={shippingAddress.country} onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control type="number" value={shippingAddress.pincode} onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})} />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="w-100" variant="primary">Proceed to Checkout</Button>
              </Form>
            </Col>
            <Col md={6}>
              <CheckoutSummary />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}
else return <Navigate to='/'/>
}

export default Checkout