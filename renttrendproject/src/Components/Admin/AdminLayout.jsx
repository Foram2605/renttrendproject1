import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'

const AdminLayout = () => {
  const [show,setShow] = useState(false)
  return (
    <div className="d-flex vh-100">
      <Sidebar show={show} setShow={setShow}/>
        <div className="flex-grow-1">
          <AdminNavbar setShow={setShow}/>
          <Container><Outlet/></Container>
            
        </div>
      
    </div>
  )
}

export default AdminLayout
