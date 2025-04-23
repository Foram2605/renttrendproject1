import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Table, Form, Image } from "react-bootstrap";
import { getData } from './api';
import { toast } from 'react-toastify';
import axios from 'axios';
const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '', mobile: '', address1: '', avatar: '', city: '' })
  const [isEdited, setIsEdited] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  const { email } = JSON.parse(sessionStorage.getItem("renttrend"))
  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/users?email=${email}`)
      .then((data) => {
        // console.log(data[0])
        setUser(data[0])
      })
      .catch(err => console.log(err))
  }, [])

  const handleImage =  async(e)=>{
    // console.log(e.target.files[0])
    let img = e.target.files[0]
    let ext = ["image/jpg","image/jpeg","image/png","image/gif","image/webp","image/jfif","image/avif",]
    if(img==undefined){toast.error("please choose image")}
    else if(img.size > 1048576) toast.error("file size exceeded")
    else if(!ext.includes(img.type))toast.error("invalid extension")
    else {
      setIsLoading(true)
      const data =  new FormData()
      data.append("file",img)
      data.append("cloud_name","harshita1")
      data.append("upload_preset","3rdfebreact")
      data.append("folder","renttrenduser") 
      try{
          const res = await axios.post("https://api.cloudinary.com/v1_1/harshita1/image/upload" , data)
          // console.log(res)
          setUser({...user, avatar:res.data.url})
          setIsLoading(false)
      }
      catch(err){toast.error(err.message);setIsLoading(false)}
    }
  }
  const handleSave = async(e) => { 
    let {mobile,username} = user
    if(!username || !mobile){toast.error("please fill name and phone");return}
    try{
      const res =  await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${user.id}`,{...user,edited:new Date()})
      setIsEdited(false)
    }
    catch(err){
      toast.error(err.message)
    }
  }
  return (
    <Container style={{ marginTop: "100px"}} className='col-10 p-4'>
       
            <Card>
              <Card.Body>
                <Card.Title><h1>User Profile</h1> <hr/></Card.Title>
                <Row>
                  <Col>
                    <Image src={`${user.avatar ? user.avatar :"https://cdn-icons-png.flaticon.com/512/147/147142.png"} `} height='300'roundedCircle />
                  </Col>
                  <Col xs={6}  offset={3}>
                  {isEdited == false ?
                  <>
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Email:</strong>{user.email}</p>
                  <p><strong>Phone:</strong> {user.mobile ? user.mobile : "NA"}</p>
                  <p><strong>Address:</strong>{user.address1 ? user.address1 : "NA"}</p>
                  <p><strong>City:</strong>{user.city ? user.city : "NA"}</p>
                  <Button variant="primary" onClick={() => setIsEdited(true)}>Edit</Button>
                  </>
                  :
                  <>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" name="avatar" onChange={handleImage}/>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={user.email} readOnly />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>   <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control type="text" name="mobile" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
                        </Form.Group></Col>
                        <Col><Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control type="text" name="address1" value={user.address1} onChange={(e) => setUser({ ...user, address1: e.target.value })} />
                        </Form.Group></Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} />
                      </Form.Group>
                      <Button variant="success" onClick={handleSave}>
                      {isLoading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status"> </div>
</div>  : <> Save </>}  

                      </Button>
                      <Button variant="secondary" className="ms-2" onClick={() => setIsEdited(false)}>Cancel</Button>
                    </Form>
                  </>}
                  </Col>
                </Row>
               
              </Card.Body>
            </Card>
         
    </Container>
  )
}

export default Profile