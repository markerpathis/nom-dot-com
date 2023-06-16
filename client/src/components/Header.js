import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo_horizontal.png";
import Auth from "../utils/auth";

export default function Header({ isLoggedIn }) {
  return (
    <Navbar style={{ background: "#FFCB77" }} expand="lg">
      <Navbar.Brand className="m-2 ps-3 pe-3" href="/">
        <img alt="" src={logo} height="30" className="d-inline-block align-top" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link pe-3 pt-3">
            Home
          </Link>
          <Link to="/publiclist" className="nav-link pe-3 pt-3">
            Recipes
          </Link>
          {isLoggedIn || Auth.loggedIn() ? (
            <>
              <NavDropdown className="pe-3 ps-1 pt-2" title="My Lists" id="basic-nav-dropdown">
                <NavDropdown.Item className="" href="/recipelist">
                  My Recipes
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="/#/shoppinglist">Shopping List</NavDropdown.Item> */}
              </NavDropdown>
              <Link to="/logout" className="nav-link pe-3 pt-3" onClick={() => Auth.logout()}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link pe-3 pt-3">
                Sign Up
              </Link>
              <Link to="/login" className="nav-link pe-3 pt-3">
                Login
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
