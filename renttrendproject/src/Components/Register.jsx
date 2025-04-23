import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import RegisterImg from '/src/assets/images/signup.jpg'
import { Link, useNavigate } from 'react-router-dom' // FIXED import
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate(); // for redirecting after registration

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    address: "",
    pincode: "",
    phone: "",
    isAdmin: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword, address, pincode, phone } = user;

    // Validation checks
    if (!username || !email || !password || !address || !pincode || !phone) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid Email Format");
      return;
    }

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (address.length < 10) {
      toast.error("Address must be at least 10 characters");
      return;
    }

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      toast.error("Invalid Pincode (6 digits, cannot start with 0)");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      toast.error("Invalid Phone Number (must start with 6, 7, 8, or 9)");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        ...user,
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
      <Card style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <Row>
          <Col xs={6}>
            <Image src={RegisterImg} fluid style={{ height: "650px", borderRadius: "6px" }} />
          </Col>
          <Col>
            <h1 style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#5f1f43",
              fontFamily: "cursive"
            }}>
              User Register Here
            </h1>
            <p style={{ textAlign: "right", fontSize: "15px", color: "#Eb9d84" }}>
              Are you Supplier? <Link to="/Supplierreg" className='text-decoration-none'>Register here</Link>
            </p>
            <hr />

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username"
                      value={user.username}
                      onChange={(e) => setUser({ ...user, username: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? "text" : "password"} name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                  <Button variant='light' className='border' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showCPassword ? "text" : "password"} name="cpassword"
                    value={user.cpassword}
                    onChange={(e) => setUser({ ...user, cpassword: e.target.value })} />
                  <Button variant='light' className='border' onClick={() => setShowCPassword(!showCPassword)}>
                    {showCPassword ? <BsEye /> : <BsEyeSlash />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={2} name="address"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type="text" name="pincode"
                      value={user.pincode}
                      onChange={(e) => setUser({ ...user, pincode: e.target.value })} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className='mb-3'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phone"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                  </Form.Group>
                </Col>
              </Row>

              <div className='d-grid gap-3'>
                <Button type='submit' style={{ backgroundColor: "#5f1f43", borderColor: "#5f1f43" }}>
                  Sign Up
                </Button>
              </div>
            </Form>

            <p className='mt-3' style={{ color: "#Eb9d84" }}>
              Already have an account? &emsp;
              <Link to="/login">Sign In</Link>
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Register;