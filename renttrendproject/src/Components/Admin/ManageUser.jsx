import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { selectusers, store_users } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FaPenAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';


const ManageUser = () => {
  const users = useSelector(selectusers);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [isDeleted,setIsDeleted] = useState(false)


  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users?isAdmin=false");
      const userList = Array.isArray(res.data.users) ? res.data.users : res.data;
      dispatch(store_users(userList));
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
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/${id}`)
        toast.success("users deleted successfully")
        setIsDeleted(!isDeleted)
      }
      catch(err){toast.error(err)}
  }
}

return (
  <>
     <div className='mt-3'>
     <h1 className='text-center'>View User</h1>
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
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className='text-center'>No User Found</td>
                  </tr>
                ) : users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.pincode}</td>
                    <td>
                      <button
                        className='btn btn-success me-2'
                        onClick={() => redirect(`/admin/users/edit/${user.id}`)}
                      >
                        <FaPenAlt />
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDelete(user.id)}
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
export default ManageUser
