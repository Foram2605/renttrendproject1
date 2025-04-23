import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getData } from '../api'
import { FaPenAlt, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, store_categories } from '../../redux/categorySlice'
import { toast } from 'react-toastify'
import axios from 'axios'

const Viewcategory = () => {
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const [isDeleted,setIsDeleted] = useState(false)
    useEffect(()=>{
        getData(`${import.meta.env.VITE_BASE_URL}/categories`).then((res)=>{  
            dispatch(store_categories(res)) })
      .catch((err)=>{ toast.error(err.message)})},[isDeleted])
    const categories = useSelector(selectCategories)
    const handleDelete = async(id)=>{
        if(window.confirm("are you sure to delete this??")){
          try{
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/categories/${id}`)
            toast.success("category deleted successfully")
            setIsDeleted(!isDeleted)
          }
          catch(err){toast.error(err)}
      }
      }

  return (
    <div className='container mt-5 col-11'>
        <h1 className='text-center'>Categories <button type="button" 
        onClick={()=>navigate('/admin/categories/add')} className='btn btn-primary btn-lg float-end mt-2'>Add</button></h1><hr />
     <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>Sr.no</th>
                    <th>Name</th>
                    <th>image</th>
                    <th>Desc</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.length==0 && <tr><td colspan={5}className='text-center'>No Category Found</td></tr>}
                {categories.map((cat,index)=> <tr key={index}>
                    <td>{index+1}</td>
                    <td>{cat.name}</td>
                    <td><img src={cat.image} width={50} height={50} /></td>
                    <td>{cat.desc}</td>
                    <td> <button type="button" className='btn btn-success me-2' 
              onClick={()=>navigate(`/admin/category/edit/${cat.id}`)}><FaPenAlt/></button>
              <button type="button" className='btn btn-danger' 
              onClick={()=>handleDelete(cat.id)}><FaTrash/></button></td>
                </tr>)}
            </tbody>
        </table>
     </div>
      
    </div>
  )
}

export default Viewcategory
