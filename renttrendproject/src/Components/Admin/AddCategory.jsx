import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { selectCategories } from '../../redux/categorySlice'

const AddCategory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState({ name: '', desc: '', image: '' })
  const [isLoading, setIsLoading] = useState(false)

  // Edit
  const { id } = useParams()
  const categories = useSelector(selectCategories)
  const categoryEdit = categories.find((item) => item.id == id)

  useEffect(() => {
    if (id) setCategory({ ...categoryEdit })
    else setCategory({ name: '', desc: '', image: '' })
  }, [id])

  const handleImage = async (e) => {
    const img = e.target.files[0]
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"]

    if (!img) {
      toast.error("Please choose an image")
    } else if (img.size > 1048576) {
      toast.error("File size exceeded (Max 1MB)")
    } else if (!allowedTypes.includes(img.type)) {
      toast.error("Invalid file format")
    } else {
      setIsLoading(true)
      const data = new FormData()
      data.append("file", img)
      data.append("cloud_name", "krupa27")
      data.append("upload_preset", "RentTrend")
      data.append("folder", "RentTrendproject")

      try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/krupa27/image/upload", data)
        setCategory({ ...category, image: res.data.url })
        toast.success("Image uploaded successfully")
        setIsLoading(false)
      } catch (err) {
        toast.error(err.message)
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic Validation
    if (!category.name.trim()) {
      toast.error("Name is required")
      return
    }
    if (category.name.length < 3) {
      toast.error("Name must be at least 3 characters")
      return
    }
    if (!category.desc.trim()) {
      toast.error("Description is required")
      return
    }
    if (category.desc.length < 10) {
      toast.error("Description must be at least 10 characters")
      return
    }
    if (!category.image) {
      toast.error("Image is required")
      return
    }

    if (!id) { // Add
      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/categories`, {
          ...category,
          createdAt: new Date()
        })
        toast.success("Category added successfully")
        navigate('/admin/categories')
      } catch (err) {
        toast.error(err.message)
      }
    } else { // Update
      try {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/categories/${id}`, {
          ...category,
          createdAt: categoryEdit.createdAt,
          editedAt: new Date()
        })
        toast.success("Category updated successfully")
        navigate('/admin/categories')
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div className='container col-8 mt-3 p-2 shadow'>
      <h1 className='text-center'>
        {id ? "Edit" : "Add"} Category
        <button type="button"
          onClick={() => navigate('/admin/categories/add')}
          className='btn btn-primary btn-lg float-end mt-2'>View</button>
      </h1>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="pic"
            accept="image/*"
            onChange={handleImage}
          />
          {category.image && <img src={category.image} alt="Preview" height={100} width={100} />}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="desc"
            className="form-control"
            value={category.desc}
            onChange={(e) => setCategory({ ...category, desc: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid gap-3">
          <button type="submit" className="btn btn-primary">
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              id ? "Update" : "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
