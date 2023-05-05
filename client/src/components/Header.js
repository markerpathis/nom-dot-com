import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Nom Dot Com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <NavDropdown title="Lists" id="basic-nav-dropdown">
            <NavDropdown.Item href="/#/recipelist">Recipe List</NavDropdown.Item>
            <NavDropdown.Item href="/#/shoppinglist">Shopping List</NavDropdown.Item>
          </NavDropdown>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
