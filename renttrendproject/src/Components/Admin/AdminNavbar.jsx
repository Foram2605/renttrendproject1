import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const AdminNavbar = ({setShow}) => {
    const redirect =  useNavigate()
    const handleLogout = ()=>{
      if(sessionStorage.getItem("renttrend") != null){
        sessionStorage.removeItem("renttrend")
        toast.success("loggedout successfully")
        redirect('/') } }
  
  return (
    <Navbar className="px-3 d-flex justify-content-between" style={{  backgroundColor:'#A888B5' }}>
    
    <div className="d-flex align-items-center">
      <button className="btn btn-outline-light d-md-none" onClick={()=>setShow(true)} >
        <FaBars />
      </button>
      <Navbar.Brand className="ms-2" style={{color:"white"}}>Admin Panel</Navbar.Brand>
    </div>
    <div className="d-flex align-items-center">
      <span className="text-white me-3">Welcome, Admin</span>
      <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
  </div>
  </Navbar>
  )
}

export default AdminNavbar
