import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { selectCategories } from '../../redux/categorySlice'

const SupplierAddCategory = () => {

    const navigate =  useNavigate()
    const [category,setCategory] =useState({name:'',desc:"",image:""})
    const [isLoading,setIsLoading] = useState(false)

    //edit
    const {id} = useParams()
    const categories = useSelector(selectCategories)
    const categoryEdit =  categories.find(item=>item.id == id)
    useEffect(()=>{
      if(id){setCategory({...categoryEdit})}
      else setCategory({name:'',desc:"",image:""})
  },[id])

    const handleImage =  async(e)=>{
      // console.log(e.target.files[0])
      let img = e.target.files[0]
      let ext = ["image/jpg","image/jpeg","image/png","image/gif","image/webp","image/jfif","image/avif",]
      if(img==undefined){toast.error("please choose image")}
      else if(img.size > 1048576)toast.error("file size exceeded") 
      else if(!ext.includes(img.type))toast.error("invalid extension")
      else{
        setIsLoading(true) 
        const data =  new FormData()
        data.append("file",img)
        data.append("cloud_name","krupa27")
      data.append("upload_preset","RentTrend")
      data.append("folder","RentTrendproject") 
      try{
        const res = await axios.post("https://api.cloudinary.com/v1_1/krupa27/image/upload" , data)
         console.log(res)
        setCategory({...category, image:res.data.url})
        setIsLoading(false)
    }
    catch(err){toast.error(err.message);setIsLoading(false)}
      }

    }
    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(!id){//add
        try{
          await axios.post(`${import.meta.env.VITE_BASE_URL}/categories` , {...category, createdAt:new Date() })
           toast.success("category added")
           navigate('/supplier/categories')
         }
         catch(err){toast.error(err)}
      }
      else{//update
        try{
          await axios.put(`${import.meta.env.VITE_BASE_URL}/categories/${id}` , {...category, createdAt:categoryEdit.createdAt , editedAt: new Date() })
           toast.success("category updated")
           navigate('/supplier/categories')
         }
         catch(err){toast.error(err)}
      }
    
       }
    

    return (
        <div className='container col-8 mt-3 p-2 shadow'>
        <h1 className='text-center'>{id ? "Edit " :"Add "}  Category<button type="button" 
        onClick={()=>navigate('/supplier/categories/add')} className='btn btn-primary btn-lg float-end mt-2'>View</button></h1><hr />
     
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text"  name="name"  class="form-control" value={category.name}
        onChange={(e)=>setCategory({...category,name:e.target.value})}/>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Image</label>
            <input type="file"    class="form-control mb-3" name="pic" accept='image/*' onChange={handleImage}/>
            {category.image && <img src={category.image} height={100} width={100}/>}
          </div>
          <div class="mb-3">
            <label for="" class="form-label">desc</label>
            <textarea type="text"  name="desc"  class="form-control" value={category.desc}
        onChange={(e)=>setCategory({...category,desc:e.target.value})}></textarea>
          </div>
          <div className="d-grid gap-3">
          <button type="submit" class="btn btn-primary">{isLoading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status"> </div> </div>  : <> {id ? "Update" : "Submit"} </>}</button>
            </div>
        </form>
      </div>
      )

 
}

export default SupplierAddCategory
