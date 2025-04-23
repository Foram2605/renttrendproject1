import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router'
import SupplierSidebar from './SupplierSidebar'
import SupplierNavbar from './SupplierNavbar'


const SupplierLayout = () => {
    const [show,setShow] = useState(false)
  return (
    <div className="d-flex vh-100">
      <SupplierSidebar show={show} setShow={setShow}/>
        <div className="flex-grow-1">
          <SupplierNavbar setShow={setShow}/>
          <Container><Outlet/></Container>
            
        </div>
      
    </div>
  )
 
}

export default SupplierLayout
