import React from 'react';
import ImageSlider from './ImageSlider';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const images = [
  { url: "./src/assets/images/product.jpg", text: "len", category: "Lehengas" },
  { url: "./src/assets/images/product1.jpg", text: "img2", category: "Kurtis" },
  { url: "./src/assets/images/product2.jpg", text: "img3", category: "Bottoms" },
];

const Home = () => {
  const navigate = useNavigate();

  // Function to handle category click and navigate to Product page
  const handleCategoryClick = (category) => {
    navigate(`/Rentoutfits?category=${category}`);
  };

  return (
    <>
      <ImageSlider />
      <Container className='mt-5 mb-4 d-flex justify-content-center'>

        <Row className='mt-5'>
          {[
            { img: 'src/assets/images/img4.jpg', title: 'Saree', category: 'Saree' },
            { img: 'src/assets/images/img3.jpg', title: 'Lehengas', category: 'Lehengas' },
            { img: 'src/assets/images/img2.jpg', title: 'AnarkaliDress', category: 'AnarkaliDress' },
            { img: 'src/assets/images/img5.jpg', title: 'Kurtis', category: 'Kurtis' },
            { img: 'src/assets/images/img6.jpg', title: 'Bottoms', category: 'Bottoms' },
            { img: 'src/assets/images/img7.jpg', title: 'Accessories', category: 'Accessories' }
          ].map((item, index) => (
            <Col xs={6} md={2} key={index}>
              <Card
                style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "60px", cursor: "pointer" }}
                onClick={() => handleCategoryClick(item.category)}
              >
                <Card.Img variant='top' src={item.img} style={{ borderRadius: "50%" }} />
                <Card.Body>
                  <Card.Title className='text-center fs-6'>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <h1 className='mt-5 text-center'>Explore Collection</h1>

      <Container fluid>
        <Row className='mt-4 d-flex justify-content-center gap-5'>
          {images.map((img, index) => (
            <Col xs={6} md={2} key={index} style={{ marginRight: "100px" }}>
              <img
                style={{ width: "350px", height: "450px", cursor: "pointer" }}
                src={img.url}
                onClick={() => handleCategoryClick(img.category)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
