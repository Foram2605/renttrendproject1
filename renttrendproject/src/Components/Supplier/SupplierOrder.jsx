import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getData } from '../api';
import { selectorders, store_orders } from '../../redux/orderSlice';

const SupplierOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get supplierId from localStorage (assumes supplier logs in and it's stored there)
    let { id } = JSON.parse(sessionStorage.getItem("renttrend"))

    useEffect(() => {
        getData(`${import.meta.env.VITE_BASE_URL}/orders`)
            .then((res) => {
                if (!Array.isArray(res)) throw new Error("Invalid response format");

                // Filter orders where at least one cart item matches the supplierId
                const filteredOrders = res.filter(order =>
                    order.cartItems.some(item => item.supplierId === id)
                );

                dispatch(store_orders(filteredOrders));
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                toast.error("Failed to fetch orders. Please try again.");
            });
    }, [id]);

    const orders = useSelector(selectorders);

    return (
        <div className='container shadow'>
            <h1>Orders</h1>
            <hr />
            <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Order ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Payment Method</th>
                            <th>Order Date and Time</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center">No orders found</td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{order.username}</td>
                                    <td>{order.email}</td>
                                    <td>{order.paymentMethod}</td>

                                    {/* Format order date */}
                                    <td>
                                        {order.orderDate ? (
                                            <>
                                                {order.orderDate.split('/')[1].padStart(2, '0')}-{/* Month */}
                                                {order.orderDate.split('/')[0].padStart(2, '0')}-{/* Day */}
                                                {order.orderDate.split('/')[2]} at {order.orderTime}
                                            </>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>

                                    {/* Status with color */}
                                    <td>
                                        {order.orderStatus !== 'delivered' ? (
                                            <span className="text-danger">{order.orderStatus}</span>
                                        ) : (
                                            <span className="text-success">{order.orderStatus}</span>
                                        )}
                                    </td>

                                    {/* View button */}
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/supplier/suporders/${order.id}`)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierOrder;
