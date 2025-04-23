import React, { useState } from 'react'
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Supplier = () => {
  const [supplier, setSupplier] = useState({
    storeName: "",
    supplierName: "",
    email: "",
    password: "",
    phone: "",
    storeAddress: "",
    pincode: "",
    isSupplier: true
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    let { storeName, supplierName, email, password, phone, storeAddress, pincode} = supplier

    if (!storeName || !supplierName || !email || !password || !phone || !storeAddress || !pincode) {
      toast.error("Please fill all the fields")
      return
    }

    if (!/^[a-zA-Z0-9 ]{3,50}$/.test(storeName)) {
      toast.error("Invalid Store Name (3-50 characters, no special characters)")
      return
    }

    if (!/^[a-zA-Z ]{3,50}$/.test(supplierName)) {
      toast.error("Invalid Supplier Name (3-50 characters, only letters and spaces)")
      return
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Invalid Email")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      toast.error("Invalid Phone Number (must start with 6, 7, 8, or 9)")
      return
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      toast.error("Invalid Pincode (6 digits, cannot start with 0)")
      return
    }

    if (storeAddress.length < 10) {
      toast.error("Store Address must be at least 10 characters")
      return
    }
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/supplier`, {
        ...supplier,
        createdAt: new Date()
      });

      toast.success("Registered successfully");
      navigate('/login'); // Redirect to login page
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };
  


  return (
    <Container className='mt-5 p-4'>
      <Card 
      style={{ 
        maxWidth: "600px", 
        margin: "auto", 
        padding: "20px",
         borderRadius: "10px" ,
         }}>
        <h2 className='text-center mb-4'style={{color:"#5f1f43",fontFamily:"cursive"}}>Supplier Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Store Name</Form.Label>
            <Form.Control type="text" name="storeName" value={supplier.storeName} onChange={(e) => setSupplier({ ...supplier, storeName: e.target.value })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control type="text" name="supplierName" value={supplier.supplierName} onChange={(e) => setSupplier({ ...supplier, supplierName: e.target.value })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={supplier.email} onChange={(e) => setSupplier({ ...supplier, email: e.target.value })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control type={showPassword ? "text" : "password"} name="password" value={supplier.password} onChange={(e) => setSupplier({ ...supplier, password: e.target.value })} />
              <Button variant='light' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEye /> : <BsEyeSlash />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phone" value={supplier.phone} onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="pincode" value={supplier.pincode} onChange={(e) => setSupplier({ ...supplier, pincode: e.target.value })} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Store Address</Form.Label>
            <Form.Control as="textarea" rows={2} name="storeAddress" value={supplier.storeAddress} onChange={(e) => setSupplier({ ...supplier, storeAddress: e.target.value })} />
          </Form.Group>

          <Button type="submit" className='w-100' style={{backgroundColor:"#5f1f43",borderColor:"#5f1f43"}}>Register</Button>
        </Form>
      </Card>
    </Container>
  )
}

export default Supplier
