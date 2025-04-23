import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getData } from '../api';
import { selectorders, store_orders } from '../../redux/orderSlice';

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getData(`${import.meta.env.VITE_BASE_URL}/orders`)
            .then((res) => {
                if (!Array.isArray(res)) throw new Error("Invalid response format");
                dispatch(store_orders(res));
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                toast.error("Failed to fetch orders. Please try again.");
            });
    }, []);

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
                            <th scope="col">Payment Method</th>
                            <th>Order Date and Time</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center">No orders found</td>
                            </tr>
                        )}

                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.username}</td>
                               
                                <td>{order.paymentMethod}</td>

                                {/* Safe Date Formatting */}
                                <td>
                                    {order.orderDate ? (
                                        <>
                                            {order.orderDate.split('/')[1].padStart(2, '0')}-
                                            {order.orderDate.split('/')[0].padStart(2, '0')}-
                                            {order.orderDate.split('/')[2]} at {order.orderTime}
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>

                                {/* Order Status with Color */}
                                <td>
                                    {order.orderStatus !== 'delivered' ? (
                                        <span className="text-danger">{order.orderStatus}</span>
                                    ) : (
                                        <span className="text-success">{order.orderStatus}</span>
                                    )}
                                </td>

                                {/* View Order Button */}
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
