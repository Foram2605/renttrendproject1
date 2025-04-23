import React, { useEffect, useState } from 'react'
import { getData } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectCategories, store_categories } from '../../redux/categorySlice'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { selectProducts } from '../../redux/productSlice'

const AddProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialData = { name: '', brand: '', category: '', price: '', stock: 0, images: [], desc: '' }
  const [product, setProduct] = useState({ ...initialData })
  const [pics, setPics] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch categories
  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/categories`)
      .then((res) => dispatch(store_categories(res)))
      .catch((err) => toast.error(err.message))
  }, [])

  const categories = useSelector(selectCategories)

  // Edit Mode
  const { id } = useParams()
  const products = useSelector(selectProducts)
  const productEdit = products.find(item => item.id == id)

  useEffect(() => {
    if (id) {
      setProduct({ ...productEdit })
      setPics([...productEdit.images])
    } else {
      setProduct({ ...initialData })
      setPics([])
    }
  }, [id])

  // ✅ Handle Image Upload
  const handleImage = (e) => {
    let images = e.target.files
    if (images.length > 5) {
      toast.error("Maximum 5 images allowed")
      return
    }

    Array.from(images).forEach(async (img) => {
      let validTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"]

      if (img.size > 1048576) {
        toast.error("File size should be less than 1MB")
      } else if (!validTypes.includes(img.type)) {
        toast.error("Invalid file format")
      } else {
        setIsLoading(true)
        const data = new FormData()
        data.append("file", img)
        data.append("cloud_name", "krupa27")
        data.append("upload_preset", "RentTrend")
        data.append("folder", "RentTrendproduct")

        try {
          const res = await axios.post("https://api.cloudinary.com/v1_1/krupa27/image/upload", data)
          setPics((prevPics) => [...prevPics, res.data.url])
          setIsLoading(false)
          toast.success("Image uploaded")
        } catch (err) {
          toast.error(err.message)
          setIsLoading(false)
        }
      }
    })
  }

  // ✅ Remove Image
  const removeImage = (index) => {
    let images = [...pics]
    images.splice(index, 1)
    setPics([...images])
  }

  // ✅ Validation
  const validateForm = () => {
    if (!product.category) {
      toast.error("Category is required")
      return false
    }
    if (!product.name.trim()) {
      toast.error("Name is required")
      return false
    }
    if (product.name.length < 3) {
      toast.error("Name must be at least 3 characters")
      return false
    }
    if (!product.price || product.price <= 0) {
      toast.error("Price should be greater than 0")
      return false
    }
    if (!product.stock || product.stock < 0) {
      toast.error("Stock should be 0 or greater")
      return false
    }
    if (!product.desc.trim()) {
      toast.error("Description is required")
      return false
    }
    if (product.desc.length < 10) {
      toast.error("Description should be at least 10 characters")
      return false
    }
    if (pics.length === 0) {
      toast.error("At least one image is required")
      return false
    }
    return true
  }

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const payload = {
      ...product,
      stock: Number(product.stock),
      price: Number(product.price),
      images: [...pics],
      createdAt: id ? productEdit.createdAt : new Date(),
      editedAt: id ? new Date() : undefined
    }

    try {
      if (id) {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`, payload)
        toast.success("Product updated successfully")
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, payload)
        toast.success("Product added successfully")
      }
      navigate('/admin/view')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='container p-3 shadow'>
      <h1>{id ? "Edit" : "Add"} Product</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}>
            <option value="" disabled>Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        </div>

        {/* Price & Stock */}
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })} />
          </div>
          <div className="col mb-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
          </div>
        </div>

        {/* Images */}
        <div className="mb-3">
          <label className="form-label">Images</label>
          <input type="file" className="form-control mb-3" multiple onChange={handleImage} />
          {pics.map((img, index) => (
            <div key={index} className="d-inline-block m-2 position-relative">
              <img src={img} height={100} width={100} />
              <button style={{ position: 'absolute', top: '-14px', right: '-10px', cursor: 'pointer', fontSize: "10px" }} onClick={() => removeImage(index)}>X</button>
              </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={product.desc}
            onChange={(e) => setProduct({ ...product, desc: e.target.value })}></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          {isLoading ? <div className="spinner-border" role="status"></div> : (id ? "Update" : "Submit")}
        </button>
      </form>
    </div>
  )
}

export default AddProduct
