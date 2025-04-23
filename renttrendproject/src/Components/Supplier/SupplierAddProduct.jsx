import React, { useEffect, useState } from 'react';
import { getData } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCategories, store_categories } from '../../redux/categorySlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { selectProducts } from '../../redux/productSlice';

const SupplierAddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialData = { name: '', brand: '', category: '', price: '', stock: 0, images: [], desc: ''};
    const [product, setProduct] = useState({ ...initialData });
    const [pics, setPics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      getData(`${import.meta.env.VITE_BASE_URL}/categories`)
        .then((res) => dispatch(store_categories(res)))
        .catch((err) => toast.error(err.message));
    }, []);
  
    const categories = useSelector(selectCategories);
    const { id } = useParams();
    const products = useSelector(selectProducts);
    const productEdit = products.find(item => item.id == id);
  
    useEffect(() => {
      if (id) {
        setProduct({ ...productEdit });
        setPics([...productEdit.images]);
      } else {
        setProduct({ ...initialData });
      }
    }, [id]);
  
    const handleImage = (e) => {
      let images = e.target.files;
      if (images.length > 5) {
        toast.error("Maximum 5 images allowed");
       

        return;
      }
      Array.from(images).forEach(async (img) => {
        let ext = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp", "image/jfif", "image/avif"];
        if (img.size > 1048576) {
          toast.error("File size exceeded (max 1MB)");
        } else if (!ext.includes(img.type)) {
          toast.error("Invalid file type");
        } else {
          setIsLoading(true);
          const data = new FormData();
          data.append("file", img);
          data.append("cloud_name", "krupa27");
          data.append("upload_preset", "RentTrend");
          data.append("folder", "RentTrendproduct");
          try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/krupa27/image/upload", data);
            setIsLoading(false);
            setPics((prevPics) => [...prevPics, res.data.url]);
          } catch (err) {
            toast.error(err.message);
            setIsLoading(false);
          }
        }
      });
    };
  
    let {id:supplierId,supplierName:supplier} = JSON.parse(sessionStorage.getItem("renttrend"))
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!product.name || !product.category || !product.price || !product.stock) {
        toast.error("All fields are required");
        return;
      }
      if (pics.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }
      try {
        if (!id) {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, {
            ...product,
            stock: Number(product.stock),
            price: Number(product.price),
            images: [...pics],
            createdAt: new Date(),
            supplierId,
            supplier
          });
          toast.success("Product added successfully");
        } else {
          await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
            ...product,
            stock: Number(product.stock),
            price: Number(product.price),
            images: [...pics],
            createdAt: productEdit.createdAt,
            editedAt: new Date()
          });
          toast.success("Product updated successfully");
        }
        navigate('/supplier/view');
      } catch (err) {
        toast.error(err.message);
      }
    };
  
    const removeImage = (index) => {
      let images = [...pics];
      images.splice(index, 1);
      setPics([...images]);
    };
  
    return (
      <div className='container p-3 shadow'>
        <h1>{id ? "Edit " : "Add "} Product</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label className="form-label">Category</label>
              <select className="form-select" name="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                <option value="" disabled>Select one</option>
                {categories.map((cat, index) => <option key={index}>{cat.name}</option>)}
              </select>
            </div>
            <div className="col mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            </div>
            <div className="col mb-3">
              <label className="form-label">Stock</label>
              <input type="number" className="form-control" name="stock" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Choose file</label>
            <input type="file" className="form-control mb-3" name="pics" multiple onChange={handleImage} />
            {pics.map((img, index) => (
              <div key={index} className="d-inline me-4" style={{ position: 'relative' }}>
                <img src={img} height={100} width={100} alt="product" />
                <button style={{ position: 'absolute', top: '-48px', right: '-10px', cursor: 'pointer', fontSize: "10px" }} onClick={() => removeImage(index)}>X</button>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="desc" className="form-control" value={product.desc} onChange={(e) => setProduct({ ...product, desc: e.target.value })}></textarea>
          </div>
          <div className="d-grid gap-3">
            <button type="submit" className="btn btn-primary">{isLoading ? <div className="d-flex justify-content-center"><div className="spinner-border" role="status"></div></div> : (id ? "Update" : "Submit")}</button>
          </div>
        </form>
      </div>
    );
}

export default SupplierAddProduct
