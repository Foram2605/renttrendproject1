import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'
import RegisterImg from '/src/assets/images/Login.jpg'
import { Link, useLocation, useNavigate } from 'react-router'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { toast } from 'react-toastify'
import axios from "axios"

const Login = () => {
  const redirect = useNavigate()
  const location = useLocation()
  const redirectURL = location ?.state ? location.state.path : '/'

  const [user,setUser] = useState({email:"",password:"",isAdmin:false,role:'customer'})
  const[show,setShow] = useState(false)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    let{email,password,role}=user
    if(!email || !password){ 
      toast.error("please fill the fields")
    }
    else{
        if(role=="supplier"){
try{
        const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/supplier?email=${user.email}`)
        if(res.data.length==0){toast.error("invalid credentails")}
        else if(res.data[0].password == user.password){
         let {id,email,supplierName,isAdmin} = res.data[0]
         sessionStorage.setItem("renttrend",JSON.stringify({id,email,supplierName,isAdmin , isLoggedIn:true ,role:"supplier"}))
           redirect('/Supplier')
           toast.success("loggedIn succcessfully")
        }
        else { toast.error("invalid credentails") }
       }
       catch(err){toast.error(err.message)}
        }
        else {
try{
        const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${user.email}`)
        if(res.data.length==0){toast.error("invalid credentails")}
        else if(res.data[0].password == user.password){
         let {id,username,email,isAdmin} = res.data[0]
         
           if(isAdmin){
            sessionStorage.setItem("renttrend",JSON.stringify({id,email,username,isAdmin , isLoggedIn:true ,role:"admin"}))
            redirect('/admin')
             }
           else {sessionStorage.setItem("renttrend",JSON.stringify({email,username,isAdmin , isLoggedIn:true ,role:"customer"})); redirect(redirectURL) }
           toast.success("loggedIn succcessfully")
        }
        else { toast.error("invalid credentails") }
       }
       catch(err){toast.error(err.message)}
        }
      
    }
  }
  
  
  
  return (
    <Container className='mt-5 p-4'>
        <Card 
            style={{
                maxWidth:"900px",
                margin:"auto",
                padding:"20px",
                borderRadius:"10px",
                boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",
                
                }}>
      <Row>
        <Col xs={4}>
            <Image src={RegisterImg} fluid style={{height:"450px", width:"350px", borderRadius:"8px"}}/>
        </Col>
        <Col>
        <h1 style={{textAlign:"center", marginTop:"20px",fontFamily:"cursive",color:"#5f1f43"}}>Login To Your Account</h1><hr/>
            <Form onSubmit={handleSubmit}>
              
                <Col>
                    <Form.Group className='mb-5' >
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" 
                      value={user.email} 
                      onChange={(e)=>setUser({...user,email:e.target.value})}></Form.Control>
                    </Form.Group>
                </Col>

              <Form.Group className='mb-5'>
                <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control type={`${show ? "text" : "password"}`} name="password"
                    value={user.password} 
                    onChange={(e)=>setUser({...user,password:e.target.value})}></Form.Control>
                    <Button variant='light' className='border' onClick={()=> setShow(!show)}>
                    {show ? <BsEye/> : <BsEyeSlash/>}
                      </Button>
                  </InputGroup>
                  <Link to='/forgot-password'>Forgot password??</Link>
              </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label className='me-3'>Supplier :</Form.Label>
                  <Form.Check type="checkbox" inline  onClick={(e)=>setUser({...user , role : e.target.checked==true ? "supplier":"customer"})}/>
                        </Form.Group>

              <div className='d-grid gap-3'>
              <Button type='submit' style={{backgroundColor:"#5f1f43",borderColor:"#5f1f43"}}>SignIn</Button>
              </div>
            </Form>

            <p className='mt-3' style={{color:"#Eb9d84"}}>Create an Account? &emsp;  <Link to="/Register">SignUp</Link></p>
        </Col>
      </Row>
      </Card>
    </Container>
  )
}

export default Login
