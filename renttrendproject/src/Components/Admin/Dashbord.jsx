import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaBox, FaShoppingCart, FaUser, FaThList, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import SalesChart from "./SalesChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    products: 0,
    users: 0,
    suppliers: 0,  // suppliers => supplier
    orders: 0,
    categories: 0,
    reviews: 0,
  });

  const icons = {
    products: <FaBox size={30} />,
    users: <FaUser size={30} />,
    suppliers: <FaUser size={30} />,  // suppliers => supplier
    orders: <FaShoppingCart size={30} />,
    categories: <FaThList size={30} />,
    reviews: <FaStar size={30} />,
  };

  const routes = {
    products: "/admin/view",
    users: "/admin/users",
    suppliers: "/admin/supplier",  // suppliers => supplier
    orders: "/admin/orders",
    categories: "/admin/categories",
    reviews: "/admin/reviews",
  };

  const handleCardClick = (key) => {
    navigate(routes[key]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = ["products", "users", "supplier", "orders", "categories", "reviews"]; // suppliers => supplier
        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`)
              .then((res) => res.json())
              .catch((err) => {
                console.error(`Error fetching ${endpoint}:`, err);
                return [];
              })
          )
        );

        const [products, users, supplier, orders, categories, reviews] = responses; // suppliers => supplier

        console.log(" API Response Debugging:");
        console.log(" Products:", products);
        console.log(" Users:", users);
        console.log(" Supplier:", supplier);  // suppliers => supplier
        console.log(" Orders:", orders);
        console.log(" Categories:", categories);
        console.log(" Reviews:", reviews);

        setData({
          products: Array.isArray(products) ? products.length : 0,
          users: Array.isArray(users) ? users.length : 0,
          suppliers: Array.isArray(supplier) ? supplier.length : 0,  // suppliers => supplier
          orders: Array.isArray(orders) ? orders.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          reviews: Array.isArray(reviews) ? reviews.length : 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <Row>
        {Object.entries(data).map(([key, value]) => (
          <Col key={key} md={4} className="mb-4">
            <Card className="text-center p-3" onClick={() => handleCardClick(key)} style={{ cursor: "pointer" }}>
              <Card.Body>
                <div className="mb-2">{icons[key]}</div>
                <Card.Title className="text-capitalize">{key}</Card.Title>
                <Card.Text className="display-4">{value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Card className="p-3">
            <h5>Monthly Sales Overview</h5>
            <SalesChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
