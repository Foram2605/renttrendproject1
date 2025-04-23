import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-black py-4 mt-5"
      style={{ fontSize: "16px",backgroundColor: "#5f1f43"  }}
    >
      <Container>
        <Row className="text-center text-md-start text-white">
         
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">RentTrends</h5>
          </Col>

       
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled ">
              <li><a href="/Rentoutfits" className="text-white text-decoration-none">Rentoutfits</a></li>
              <li><a href="/Rentoutfits?category=Accessories" className="text-white text-decoration-none">accessories</a></li>
              <li><a href="/contactUs" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
            </ul>
          </Col>

         
          <Col md={4} className="text-center text-md-end">
            <h5 className="fw-bold text-white">Follow Us</h5>
            <motion.div
              className="d-flex justify-content-center justify-content-md-end gap-3 text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <a href="#" className="text-white fs-4"><FaFacebook /></a>
              <a href="#" className="text-white fs-4"><FaTwitter /></a>
              <a href="#" className="text-white fs-4"><FaInstagram /></a>
              <a href="#" className="text-white fs-4"><FaLinkedin /></a>
            </motion.div>
          </Col>
        </Row>

        <hr className="border-white mt-4" />

     
        <Row>
          <Col className="text-center text-white">
            <p className="mb-0">&copy; {new Date().getFullYear()} Renttrend. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </motion.footer>
  );
};

export default Footer;