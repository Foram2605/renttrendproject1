import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
        address: '',
        phone: '',
        pincode: ''
    });
    const redirect = useNavigate();

    const getUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`);
            setUser(res.data);
        } catch (err) {
            toast.error("Failed to fetch user details.");
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${id}`, user);
            toast.success("User updated successfully!");
            redirect('/admin/users');
        } catch (err) {
            toast.error("Failed to update user.");
            console.log(err);
        }
    };

    return (
        <div className='container p-3 shadow'>
            <h1 className='text-center'>Edit User</h1>
            <form onSubmit={handleUpdate} className='mt-3'>
                <div className='mb-3'>
                    <label>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={user.username}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
                
                <div className= 'mb-3'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={user.email}
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
                        value={user.phone}
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
                        value={user.pincode}
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
                        value={user.address}
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

export default EditUser;
