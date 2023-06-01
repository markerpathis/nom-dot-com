import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export default function Login() {
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
    console.log(loginData);
    try {
      const loginResponse = await axios.post("/api/users/login", {
        email: loginData.email,
        password: loginData.password,
      });
      Auth.login(loginResponse.data.token);
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
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter Password" value={loginData.password || ""} onChange={handleInputChange} />
          </Form.Group>
          <ButtonComp label={"Submit"} handleClick={postLogin}></ButtonComp>
        </Form>
      </Container>
    </div>
  );
}
