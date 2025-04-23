import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    const searchFromUrl = queryParams.get("search");

    setSelectedCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl || "");

    getData();
  }, [location.search]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProduct(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get unique categories
  const category = Array.from(new Set(product.map((item) => item.category)));

  // Apply filters
  useEffect(() => {
    let filtered = product;

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    filtered = filtered.filter(
      (item) =>
        item.price >= minPrice &&
        item.price <= maxPrice &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
    setItemOffset(0);
  }, [selectedCategory, minPrice, maxPrice, product, searchQuery]);

  //////////////////////////////// Pagination //////////////////////////
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
  }, [itemOffset, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <Row>
        {/* Sidebar Filters */}
        <Col xs={3} className="mt-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Category Filter */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-dark text-white fw-bold d-flex align-items-center">
                <FaFilter className="me-2" /> Category
              </Card.Header>
              <Card.Body>
                {category.map((cat, index) => (
                  <p
                    key={index}
                    className={`py-2 px-3 rounded mb-2 ${selectedCategory === cat ? "bg-primary text-white" : "bg-light text-dark"}`}
                    style={{ cursor: "pointer", transition: "0.3s" }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </p>
                ))}
              </Card.Body>
            </Card>

            {/* Price Range Filter */}
            <Card className="mb-4 shadow-sm border-0">
              <Card.Header className="bg-dark text-white fw-bold d-flex align-items-center">
                <FaFilter className="me-2" /> Price Range
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Min Price: ₹{minPrice}</Form.Label>
                  <Form.Range
                    min="0"
                    max="100000"
                    step="500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    style={{ accentColor: "#007bff" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Max Price: ₹{maxPrice}</Form.Label>
                  <Form.Range
                    min="0"
                    max="100000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{ accentColor: "#28a745" }}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Reset Filters */}
            <Button
              variant="danger"
              className="w-100 fw-bold py-2 shadow"
              onClick={() => {
                setSelectedCategory(null);
                setMinPrice(0);
                setMaxPrice(100000);
              }}
            >
              Reset All Filters
            </Button>
          </motion.div>
        </Col>

        {/* Product List */}
        <Col>
          {/* <h1>Product Page</h1>
          <hr /> */}

          <Row>
            {currentItems.length > 0 ? (
              currentItems.map((product, index) => <ProductCard Product={product} key={index} />)
            ) : (
              <p className="text-center fw-bold text-danger">No Products Found</p>
            )}
          </Row>

          {/* Pagination */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            containerClassName="pagination mt-5 d-flex justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            activeClassName="page-item active"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
