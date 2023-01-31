import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    
    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    const getPurchases = () => {
        if(token){
            navigate("/purchases")
        } else {
            navigate("/login")
        }
    }

    return (
        <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>E-comerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/login"}><i className='bx bx-user bx-md'></i></Nav.Link>
                        <Nav.Link as={Link} to={"/purchases"} onClick={() => getPurchases()}><i className='bx bx-list-check bx-md'></i></Nav.Link>
                        <Nav.Link><i className='bx bx-cart-alt bx-md'></i></Nav.Link>
                        {token && 
                            <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;