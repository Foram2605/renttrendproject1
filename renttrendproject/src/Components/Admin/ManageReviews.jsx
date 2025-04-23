import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import ReactStars from 'react-stars';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((err) => console.error('Error deleting review:', err));
  };

  const handleApprove = (id) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: true }),
    })
      .then((res) => res.json())
      .then((updatedReview) => {
        setReviews(reviews.map((review) => (review.id === id ? updatedReview : review)));
      })
      .catch((err) => console.error('Error approving review:', err));
  };

  return (
    <div className="mt-4">
      <h3 className="h4 mb-3">Manage Reviews</h3>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {reviews.length === 0 && !loading ? (
        <p className="text-muted">No reviews available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
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
                <td>{review.productName}</td>
                <td>{review.username}</td>
                <td>
                  <ReactStars value={review.rating} count={5} size={16} edit={false} /> ({review.rating}/5)
                </td>
                <td>{review.comment}</td>
                <td>{new Date(review.date).toLocaleDateString()}</td>
                <td>
                  {!review.approved && (
                    <Button variant="success" size="sm" onClick={() => handleApprove(review.id)}>
                      Approve
                    </Button>
                  )}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(review.id)} className="ms-2">
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

export default ManageReviews;
