import React, { useEffect, useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectorders } from '../redux/orderSlice';
import { Modal, Button, Form } from "react-bootstrap";
import ReactStars from "react-stars";

const ReviewModal = ({ orderId, product, onClose, onReviewSubmitted, username }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      orderId,
      productId: product.id,
      productName: product.name,
      username,
      rating,
      comment,
      date: new Date().toISOString(),
      ...(product.supplierId && {
        supplierId: product.supplierId,
        supplierName: product.supplier
        })
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onReviewSubmitted(reviewData);
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Review: {product.name} (OrderID {orderId})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rating:</Form.Label>
            <ReactStars count={5} value={rating} size={24} onChange={setRating} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const MyOrderDetails = () => {
  const { id } = useParams();
  const orders = useSelector(selectorders);
  const order = orders.find((item) => item.id == id);
  const { username } = JSON.parse(sessionStorage.getItem("renttrend"));
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState({});

  const calculateRentalDays = (item) => {
    if (item.BookingDate && item.returnDate) {
      const BookingDate = new Date(item.BookingDate);
      const returnDate = new Date(item.returnDate);
      const diffInMs = returnDate - BookingDate;
      const rentalDays = Math.max(diffInMs / (1000 * 60 * 60 * 24), 0);
      return rentalDays || 1;
    }
    return 1;
  };

  const subtotal = order?.cartItems.reduce((sum, item) => {
    const rentalDays = calculateRentalDays(item);
    return sum + rentalDays * item.price;
  }, 0) || 0;

  const deposit = subtotal * 0.3;
  const finalTotal = subtotal + deposit;

  const handleOpenReview = (product) => {
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const handleCloseReview = () => {
    setShowReviewModal(false);
    setSelectedProduct(null);
  };

  const handleReviewSubmitted = (reviewData) => {
    setReviewedProducts((prev) => ({
      ...prev,
      [reviewData.productId]: true,
    }));
  };

  useEffect(() => {
    if (order && username) {
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews?orderId=${order.id}&username=${username}`)
        .then(res => res.json())
        .then(data => {
          const reviewed = {};
          data.forEach(review => {
            reviewed[review.productId] = true;
          });
          setReviewedProducts(reviewed);
        })
        .catch(err => console.error("Error fetching existing reviews:", err));
    }
  }, [order, username]);

  return (
    <div className='container shadow mt-5 p-4'>
      <h1>My Order Details</h1><hr />
      <div className='mb-3'>
        <Link to='/myorders' className='btn btn-primary mb-2'>
          <FaArrowCircleLeft /> Back to Orders
        </Link>
      </div>

      {order == null ?
        <div className='spinner-border' style={{ width: "3rem", height: "3rem" }}></div>
        :
        <>
          <h4 className='text-info'>Order Status : {order.orderStatus}</h4>
          <b>Shipping Address</b><br />
          Name: {order.shippingAddress.name},<br />
          Address: {order.shippingAddress.address1},<br />
          City: {order.shippingAddress.city}<br />
          Pincode: {order.shippingAddress.pincode},<br />
          Contact: {order.shippingAddress.mobile}
          <br />

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price Per Day</th>
                  <th>Total Days</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => {
                  const rentalDays = calculateRentalDays(item);
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td><img src={item.images[0]} height={50} width={50} /></td>
                      <td>&#8377;{item.price}</td>
                      <td>{rentalDays}</td>
                      <td>&#8377;{(rentalDays * item.price).toFixed(2)}</td>
                      <td>
                        {reviewedProducts[item.id] ? (
                          <button type="button" className="btn btn-secondary" disabled>
                            Review Given
                          </button>
                        ) : (
                          <button type="button" className="btn btn-success" onClick={() => handleOpenReview(item)}>
                            Give Review
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className='text-end fw-bold'>Subtotal:</td>
                  <td>&#8377;{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className='text-end fw-bold'>Deposit (30%):</td>
                  <td>&#8377;{deposit.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={5} className='text-end fw-bold fs-5'>Final Total:</td>
                  <td className='fs-5'>&#8377;{finalTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {showReviewModal && selectedProduct && (
            <ReviewModal
              orderId={order.id}
              product={selectedProduct}
              onClose={handleCloseReview}
              onReviewSubmitted={handleReviewSubmitted}
              username={order.username}
            />
          )}
        </>
      }
    </div>
  );
};

export default MyOrderDetails;
