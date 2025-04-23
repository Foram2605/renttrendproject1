import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    { url: "./src/assets/images/Home1.jpg", text: "image1" },
    { url: "./src/assets/images/Home2.jpg", text: "image1" },
    { url: "./src/assets/images/Home3.jpg", text: "image2" },
  ];

  const CustomPrevArrow = ({ onClick }) => (
    <button
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        zIndex: 10,
        border: "none",
        borderRadius: "50%",
        padding: "10px",
      }}
    ></button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        zIndex: 10,
        border: "none",
        borderRadius: "50%",
        padding: "10px",
      }}
    ></button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <>
      {" "}
      <Slider {...settings}>
        {images.map((img1, index) => (
          <div key={index} style={{ position: "relative" , overflow:"hidden"}}>
            <img
              src={img1.url}
              alt={img1.text}
              className="d-block w-100"
              style={{ height: "600px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ImageSlider;
