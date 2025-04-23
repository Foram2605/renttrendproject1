import React, { useEffect, useState } from "react";
import { Card, Button, Col, Modal, Row, Form, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addtocart } from "../redux/cartSlice";
import ProductImages from "./ProductImages";
import ReactStars from "react-stars";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ProductCard = ({ Product }) => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [BookingDate, setBookingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [reviews, setReviews] = useState([]);

  const isOutOfStock = Product.stock === 0;

  useEffect(() => {
    if (Product) {
      fetch(`${import.meta.env.VITE_BASE_URL}/reviews?productId=${Product.id}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.error("Error fetching reviews:", err));
    }
  }, [Product]);

  const handleCart = () => {
    if (!isOutOfStock) {
      setSelectedProduct(Product);
      setShowModal(true);
    }
  };

  const calculateTotalPrice = (start, end) => {
    if (start && end) {
      const startDay = new Date(start);
      const endDay = new Date(end);
      const days = Math.max((endDay - startDay) / (1000 * 60 * 60 * 24), 0);
      setTotalPrice(days * Product.price);
    }
  };

  const handleConfirmRental = () => {
    if (!BookingDate || !returnDate) {
      toast.error("Please select both Booking and Return dates.");
      return;
    }

    dispatch(addtocart({ ...selectedProduct, BookingDate, returnDate, totalPrice }));
    setShowModal(false);
    setBookingDate("");
    setReturnDate("");
    setTotalPrice(0);
  };

  return (
    <Col lg={3} sm={6} xs={12} md={4}>
      <motion.div whileHover={{ scale: isOutOfStock ? 1 : 1.05 }} whileTap={{ scale: isOutOfStock ? 1 : 0.95 }}>
        <OverlayTrigger
          placement="top"
          overlay={isOutOfStock ? <Tooltip>Out of Stock</Tooltip> : <></>}
        >
          <Card
            onClick={handleCart}
            className="shadow-lg rounded-4 border-0"
            style={{
              height: "550px",
              opacity: isOutOfStock ? 0.6 : 1,
              pointerEvents: isOutOfStock ? "none" : "auto",
              cursor: isOutOfStock ? "not-allowed" : "pointer"
            }}
          >
            <Card.Img
              src={Product.images[0]}
              style={{
                height: "350px",
                borderRadius: "12px 12px 0 0",
                filter: isOutOfStock ? "grayscale(100%) blur(1px)" : "none"
              }}
            />
            <Card.Body className="text-center">
              <Card.Title className="fw-bold text-dark">{Product.name}</Card.Title>
              <Card.Text className="text-muted">
                {Product.category} <br /> ₹{Product.price}
              </Card.Text>
              <Button variant={isOutOfStock ? "danger" : "dark"} disabled={isOutOfStock}>
                {isOutOfStock ? "Out of Stock" : "Rent Now"}
              </Button>
            </Card.Body>
          </Card>
        </OverlayTrigger>
      </motion.div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Rent {selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Row>
              <Col md={6} className="text-center">
                <ProductImages images={selectedProduct.images} />
              </Col>
              <Col md={6}>
                <h5 className="mt-3">{selectedProduct.name}</h5>
                <p className="text-muted">{selectedProduct.category}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                <p><strong>Price Per Day:</strong> ₹{selectedProduct.price}</p>

                {selectedProduct.supplier && <p><strong>Supplier:</strong> {selectedProduct.supplier}</p>}
                <Form.Group className="mb-3">
  <Form.Label>Booking Date</Form.Label>
  <Form.Control
    type="date"
    min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // Today + 2 days
    value={BookingDate}
    onChange={(e) => {
      const selected = e.target.value;
      setBookingDate(selected);
      calculateTotalPrice(selected, returnDate);
    }}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Return Date</Form.Label>
  <Form.Control
    type="date"
    min={BookingDate ? new Date(new Date(BookingDate).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] : ""}
    value={returnDate}
    onChange={(e) => {
      const selected = e.target.value;
      setReturnDate(selected);
      calculateTotalPrice(BookingDate, selected);
    }}
    disabled={!BookingDate}
  />
</Form.Group>

                {totalPrice > 0 && <p className="mt-2"><strong>Total Price:</strong> ₹{totalPrice}</p>}
                <h4 className="h5 mt-4">Reviews</h4>
                <ListGroup>
                  {reviews.length > 0 ? reviews.map(review => (
                    <ListGroup.Item key={review.id}>
                      <ReactStars value={review.rating} count={5} size={16} edit={false} />
                      <p><strong>{review.username}:</strong> {review.comment}</p>
                    </ListGroup.Item>
                  )) : <p className="text-muted">No reviews yet.</p>}
                </ListGroup>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleConfirmRental}>Confirm Rental</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ProductCard;
