import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
            setToastMessage("Your message has been submitted successfully!");
        } else {
            setErrors(newErrors);
            setSuccess(false);
            setToastMessage("Please correct the errors in the form.");
        }
        setShowToast(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={success ? "success" : "danger"}>
                   <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Row className="w-100" style={{ maxWidth: '500px' }}>
                <Col>
                    <div className="shadow-lg p-4 rounded-3 bg-white">
                        <h1 className="text-center fw-bold mb-4" style={{color:'#5f1f43' , fontFamily:'cursive'}}>Contact Us</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label style={{ fontFamily:'cursive'}}>Name</Form.Label>
                                <Form.Control style={{ fontFamily:'cursive'}}
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label style={{ fontFamily:'cursive'}}>Email</Form.Label>
                                <Form.Control style={{ fontFamily:'cursive'}}
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label style={{ fontFamily:'cursive'}}>Message</Form.Label>
                                <Form.Control style={{ fontFamily:'cursive'}}
                                    as="textarea"
                                    rows={4}
                                    placeholder="Write your message here..."
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!errors.message}
                                />
                                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" className="w-100" style={{backgroundColor:'#5f1f43', borderColor:'#5f1f43',fontFamily:'cursive'}}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;