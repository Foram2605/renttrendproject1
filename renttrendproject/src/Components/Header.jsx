import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCart3 } from "react-icons/bs";
import { InputGroup } from 'react-bootstrap'
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';
import { ShowOnLogin, ShowOnLogout } from './hiddenlinks';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    if (sessionStorage.getItem("renttrend") !== null) {
      sessionStorage.removeItem("renttrend");
      toast.success("Logged out successfully");
      navigate('/');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("renttrend") !== null) {
      let obj = JSON.parse(sessionStorage.getItem("renttrend"));
      setUsername(obj.username);
    }
  }, [sessionStorage.getItem("renttrend")]);

  const cartItems = useSelector(selectCart);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    navigate(`/Rentoutfits?search=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <Navbar expand="md">
        <Container fluid>
          <Navbar.Brand href="#" className='fs-2 fw-bold ms-2' style={{ color: '#5f1f43', fontFamily: "cursive", marginRight: "20px" }}>RentTrends</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link as={NavLink} to="/" style={{ color: "black" }}>HOME</Nav.Link>
              <Nav.Link as={NavLink} to="/Rentoutfits" style={{ color: "black" }}>RENT OUTFITS</Nav.Link>
              <Nav.Link as={NavLink} to="/Rentoutfits?category=Accessories" style={{ color: "black" }}>ACCESSORIES</Nav.Link>
              <Nav.Link as={NavLink} to="/about" style={{ color: "black" }}>ABOUT</Nav.Link>
              <Nav.Link as={NavLink} to="/contactUs" style={{ color: "black" }}>CONTACTUS</Nav.Link>
            </Nav>

            <Form className='d-inline'>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </InputGroup>
            </Form>

            <Nav>
              <Nav.Link as={NavLink} to="/cart">
                <div style={{ position: 'relative' }}>
                  <BsCart3 style={{ fontSize: "30px" }} />
                  <span className='badge rounded-pill text-bg' style={{ position: 'absolute', top: '-7px', right: '-15px', backgroundColor: "#5f1f43" }}>{cartItems.length}</span>
                </div>
              </Nav.Link>

              <ShowOnLogin>
                <FaCircleUser className='mt-1 ms-4' style={{ fontSize: '35px' }} />
                <NavDropdown title={`Welcome ${username}`} id="navbarScrollingDropdown" style={{ fontSize: "20px" }}>
              <NavDropdown.Item as={NavLink} to="/profile"><FaUser /> Profile</NavDropdown.Item>
                 <NavDropdown.Divider/>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/myorders">My Order</NavDropdown.Item>
                  <NavDropdown.Item href="#">Track Order</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={handleLogout}><BiLogOutCircle style={{ fontSize: "20px" }} /> LogOut</NavDropdown.Item>
                </NavDropdown>
              </ShowOnLogin>

              <ShowOnLogout>
                <Button as={NavLink} to="/Login" style={{ fontSize: "20px", marginLeft: "20px", backgroundColor: "#5f1f43", border: "1px solid #5f1f43" }}>
                  <BiLogInCircle /> Login
                </Button>
              </ShowOnLogout>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
