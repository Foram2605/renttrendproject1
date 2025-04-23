import React from 'react'
import { Nav, Offcanvas } from 'react-bootstrap'
import { FaComment, FaHome, FaList, FaPenFancy, FaShoppingBag, FaThList, FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router'

const SupplierSidebar = ({show,setShow}) => {
     const links= [ {url:'/supplier' ,text:'Dashboard' , icon:<FaHome/>},
         {url:'/supplier/categories' ,text:'Manage Categories' , icon:<FaList/>},
         {url:'/supplier/view' ,text:'View Products' , icon:<FaShoppingBag/>},
         {url:'/supplier/add' ,text:'Add Product' , icon:<FaPenFancy/>},
         {url:'/supplier/suporder' ,text:'Manage Orders' , icon:<FaThList/>},
        {url:'/supplier/review' ,text:'Manage Reviews' , icon:<FaComment/>},
       ]
  return (
        <>  <div className="d-none d-md-flex flex-column text-white p-3"  style={{ width: "250px" , backgroundColor:'#441752', height:"700px" }}>
         <h4 className="text-center">Supplier</h4>
         <Nav className="flex-column">
         {links.map((link,index)=>
                  <Nav.Link as={NavLink} key={index} to={link.url} className="text-white mb-4">
                  <span className='me-2'> {link.icon}</span> {link.text}
                  </Nav.Link>
         )}
    
          </Nav>
       </div>
       <Offcanvas  show={show} onHide={()=>setShow(false)} className=" text-white" style={{backgroundColor:'#441752'}}>
             <Offcanvas.Header closeButton>
               <Offcanvas.Title>Supplier Panel</Offcanvas.Title>
             </Offcanvas.Header>
             <Offcanvas.Body>
               <Nav className="flex-column">
               {links.map((link,index)=>
                  <Nav.Link as={NavLink} key={index} to={link.url} className="text-white mb-4">
                  <span className='me-2'> {link.icon}</span> {link.text}
                </Nav.Link>
               )} 
               </Nav>
             </Offcanvas.Body>
             </Offcanvas>
       </>
      )
  
}

export default SupplierSidebar
