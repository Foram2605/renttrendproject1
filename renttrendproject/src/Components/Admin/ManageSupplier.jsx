import axios from 'axios';
import React, { useEffect, useState} from 'react'
import {  selectsuppliers,  store_suppliers } from '../../redux/supplierSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ManageSupplier = () => {

    const supplier = useSelector(selectsuppliers);
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const [isDeleted,setIsDeleted] = useState(false)
  
  
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/supplier?isAdmin=false");
        const supplierList = Array.isArray(res.data.supplier) ? res.data.supplier : res.data;
        dispatch(store_suppliers(supplierList));
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, [isDeleted]);
  
    const handleDelete = async(id)=>{
      if(window.confirm("are you sure to delete this??")){
        try{
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/supplier/${id}`)
          toast.success("supplier deleted successfully")
          setIsDeleted(!isDeleted)
        }
        catch(err){toast.error(err)}
    }
  }
  
  return (
    <>
       <div className='mt-3'>
       <h1 className='text-center'>View Supplier</h1>
            <hr />
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>emali</th>
                    <th>address</th>
                    <th>Phone</th>
                    <th>pincode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.length === 0 ? (
                    <tr>
                      <td colSpan={8} className='text-center'>No Supplier Found</td>
                    </tr>
                  ) : supplier.map((supplier, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{supplier.supplierName}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.storeAddress}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.pincode}</td>
                      <td>
                        <button
                          className='btn btn-success me-2'
                          onClick={() => redirect(`/admin/supplier/edit/${supplier.id}`)}
                        >
                          <FaPenAlt />
                        </button>
                        <button
                          className='btn btn-danger'
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <FaTrash/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </>
  )
  
  

}

export default ManageSupplier
