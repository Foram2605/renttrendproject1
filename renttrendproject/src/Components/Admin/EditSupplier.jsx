import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const EditSupplier = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        pincode: ''
    });
    const redirect = useNavigate();

    const getSupplier = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/supplier/${id}`);
            setSupplier(res.data);
        } catch (err) {
            toast.error("Failed to fetch supplier details.");
            console.log(err);
        }
    };

    useEffect(() => {
        getSupplier();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/supplier/${id}`, supplier);
            toast.success("Supplier updated successfully!");
            redirect('/admin/supplier');
        } catch (err) {
            toast.error("Failed to update supplier.");
            console.log(err);
        }
    };

    return (
        <div className='container p-3 shadow'>
            <h1 className='text-center'>Edit Supplier</h1>
            <form onSubmit={handleUpdate} className='mt-3'>
                <div className='mb-3'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={supplier.supplierName}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>

                <div className='mb-3'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={supplier.email}
                        onChange={handleChange}
                        className='form-control mb-4'
                        required
                    />
                    <div className='row'>
                        <div className='col mb-3'>
                            <label>Phone</label>
                            <input
                                type='number'
                                name='phone'
                                value={supplier.phone}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                        <div className='col mb-3'>
                            <label>Pincode</label>
                            <input
                                type='number'
                                name='pincode'
                                value={supplier.pincode}
                                onChange={handleChange}
                                className='form-control'
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-2'>
                    <label>Address</label>
                    <textarea
                        type='text'
                        name='address'
                        value={supplier.storeAddress}
                        onChange={handleChange}
                        className='form-control mb-4'
                        required
                    />
                </div>

                <button type='submit' className='btn btn-primary w-100'>Update</button>
            </form>
        </div>
    );
};

export default EditSupplier;
