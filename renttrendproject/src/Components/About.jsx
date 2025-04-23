import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaEye, FaBullseye, FaUsers, FaHandshake, FaStar, FaGlobe, FaLightbulb, FaShoppingBag } from "react-icons/fa";

const AboutUs = () => {
  return (
    <Container fluid className="py-5 d-flex flex-column align-items-center" style={{ backgroundColor: "#FFF0EB", color: "black" }}>
      <motion.h1
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-center w-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ fontSize: "18px", lineHeight: "1.8" }}
      >
        We aim to revolutionize fashion by making high-quality outfits accessible and sustainable. Our platform ensures affordability, convenience, and a seamless rental experience for all. Whether it's for a wedding, a party, or a corporate event, we provide the best outfit solutions tailored to your needs.
      </motion.p>
      <Row className="mt-4 w-100 d-flex justify-content-center">
        {[{ title: "Our Vision", text: "To revolutionize fashion rentals for everyone.", icon: <FaEye size={40} /> },
          { title: "Our Mission", text: "To provide stylish outfits with convenience and affordability.", icon: <FaBullseye size={40} /> },
          { title: "Why Choose Us?", text: "Blending fashion with technology for a seamless rental experience.", icon: <FaUsers size={40} /> },
          { title: "Sustainability", text: "We promote eco-friendly practices by encouraging outfit rentals over fast fashion.", icon: <FaGlobe size={40} /> }]
          .map((item, index) => (
            <Col md={3} key={index} className="d-flex justify-content-center mb-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card style={{ backgroundColor: "#7a2459", color: "#fff", borderRadius: "15px" , height:"230px"}} className="p-4 text-center border-0 shadow-lg">
                  <Card.Body>
                    {item.icon}
                    <Card.Title className="mt-3">{item.title}</Card.Title>
                    <Card.Text>{item.text}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
        ))}
      </Row>
      <Row className="mt-5 w-100 d-flex justify-content-center">
        {[{ title: "Our Commitment", text: "Ensuring the best rental fashion experience.", icon: <FaHandshake size={40} /> },
          { title: "Customer Satisfaction", text: "Providing seamless and hassle-free services.", icon: <FaStar size={40} /> },
          { title: "Innovation", text: "Continuously improving with the latest trends and technologies.", icon: <FaLightbulb size={40} /> },
          { title: "Diverse Collection", text: "A wide variety of outfits for different occasions.", icon: <FaShoppingBag size={40} /> }]
          .map((item, index) => (
            <Col md={4} key={index} className="d-flex justify-content-center mb-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Card style={{ backgroundColor: "#8a2d5e", color: "#fff", borderRadius: "15px" }} className="p-4 text-center border-0 shadow-lg">
                  <Card.Body>
                    {item.icon}
                    <Card.Title className="mt-3">{item.title}</Card.Title>
                    <Card.Text>{item.text}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;