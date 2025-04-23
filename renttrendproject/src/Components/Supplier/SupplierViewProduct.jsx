import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { getData } from '../api'
import { selectProducts, store_products } from '../../redux/productSlice'
import axios from 'axios'
import { FaPenAlt, FaTrash } from 'react-icons/fa'

const SupplierViewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isDeleted, setIsDeleted] = useState(false)

  // Supplier ID from session/authentication
  let {id:supplierId} = JSON.parse(sessionStorage.getItem("renttrend")) // Ensure this is set correctly in authentication

  useEffect(() => {
    getData(`${import.meta.env.VITE_BASE_URL}/products`)
      .then((res) => {
        // Filter products added by the logged-in supplier
        const supplierProducts = res.filter(
          product => product.supplierId === supplierId 
        )
        dispatch(store_products(supplierProducts))
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [isDeleted])

  const products = useSelector(selectProducts)

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`)
        toast.success("Product deleted successfully")
        setIsDeleted(!isDeleted)
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div>
      <h1 className='text-center'>My Products</h1><hr />
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Category</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={7} className='text-center'>No Product Found</td></tr>
            )}
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>
                  <img src={product?.images?.[0]} alt="loading" height={50} width={50} />
                </td>
                <td>&#8377;{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button type="button" className='btn btn-success me-2'
                    onClick={() => navigate(`/supplier/product/edit/${product.id}`)}>
                    <FaPenAlt />
                  </button>
                  <button type="button" className='btn btn-danger'
                    onClick={() => handleDelete(product.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SupplierViewProduct
