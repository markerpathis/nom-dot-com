import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleInputChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "firstName") {
      setUserData({ ...userData, firstName: inputValue });
    } else if (inputType === "lastName") {
      setUserData({ ...userData, lastName: inputValue });
    } else if (inputType === "email") {
      setUserData({ ...userData, email: inputValue });
    } else {
      setUserData({ ...userData, password: inputValue });
    }
  };

  const postUser = async () => {
    let signupApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      signupApiUrl = "https://nomdotcom.herokuapp.com/api/users";
    } else {
      signupApiUrl = "http://localhost:3001/api/users";
    }
    try {
      console.log(signupApiUrl);
      await axios.post(signupApiUrl, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "#fef9ef" }} className="pt-4">
      <Container>
        <h2 className="pt-3 border-bottom border-dark border-2">Create Account</h2>
        <Form>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" placeholder="Enter First Name" value={userData.firstName || ""} onChange={handleInputChange} />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" placeholder="Enter Last Name" value={userData.lastName || ""} onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter Email Address" value={userData.email || ""} onChange={handleInputChange} />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter Password" value={userData.password || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              Do you already have an account? <a href="/login">Login</a>
            </Form.Text>
          </Form.Group>
          <ButtonComp label={"Submit"} handleClick={postUser}></ButtonComp>
        </Form>
      </Container>
    </div>
  );
}
