import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactStars from 'react-stars';
import { toast } from 'react-toastify';

const SupManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    const supplierData = JSON.parse(sessionStorage.getItem("renttrend"));
    if (!supplierData || !supplierData.id) {
      console.error("Supplier not logged in.");
      return;
    }

    const supplierId = supplierData.id;

    fetch(`${import.meta.env.VITE_BASE_URL}/reviews`)
      .then(res => res.json())
      .then(data => {
        const filteredReviews = data.filter(
          review => review.supplierId === supplierId
        );
        setReviews(filteredReviews);
      })
      .catch(err => console.error("Error fetching reviews:", err));
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: true }),
      });
      toast.success("Review approved!");
      fetchReviews();
    } catch (err) {
      console.error("Error approving review:", err);
      toast.error("Failed to approve review.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${id}`, {
        method: "DELETE",
      });
      toast.success("Review deleted!");
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="mt-4 container">
      <h3 className="h4 mb-3">My Product Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-muted">No reviews available for your products.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Username</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{index + 1}</td>
                <td>{review.orderId}</td>
                <td>{review.productId}</td>
                <td>{review.productName}</td>
                <td>{review.username}</td>
                <td>
                  <ReactStars value={review.rating} count={5} size={16} edit={false} />
                  ({review.rating}/5)
                </td>
                <td>{review.comment}</td>
                <td>{new Date(review.date).toLocaleDateString()}</td>
                <td>
                  {!review.approved && (
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(review.id)}>
                      Approve
                    </Button>
                  )}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(review.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SupManageReviews;
