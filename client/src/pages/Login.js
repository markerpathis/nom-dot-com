import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === "email") {
      setLoginData({ ...loginData, email: inputValue });
    } else {
      setLoginData({ ...loginData, password: inputValue });
    }
  };

  const postLogin = async () => {
    let loginApiUrl = "";
    if (process.env.NODE_ENV === "production") {
      loginApiUrl = "https://nomdotcom.herokuapp.com/api/users/login";
    } else {
      loginApiUrl = "http://localhost:3001/api/users/login";
    }
    try {
      const loginResponse = await axios.post(loginApiUrl, {
        email: loginData.email,
        password: loginData.password,
      });
      Auth.login(loginResponse.data.token);
      setIsLoggedIn(1);
      navigate("/recipelist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ background: "#fef9ef" }} className="pt-4">
      <Container>
        <h2 className="pt-3 border-bottom border-dark border-2">Login</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter Email Address" value={loginData.email || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter Password" value={loginData.password || ""} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              Do you need to create an account? <a href="/signup">Sign Up</a>
            </Form.Text>
          </Form.Group>
          <ButtonComp label={"Submit"} handleClick={postLogin}></ButtonComp>
        </Form>
      </Container>
    </div>
  );
}
