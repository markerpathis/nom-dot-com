import React from "react";
import logoStack from "../assets/logo_stack.png";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home() {
  return (
    <>
      <div className="pt-5" style={{ background: "#fef9ef" }}>
        <div className="pt-5">
          <Container className="h-full d-flex flex-column">
            <Row className="h-full align-items-center">
              <Col className="d-flex  justify-content-center">
                <div className="fs-2">Welcome to Nom Dot Com! This a recipe app, which is still in progress. The purpose is to just continue practicing React.</div>
              </Col>
              <Col className="d-flex  justify-content-center">
                <img alt="" src={logoStack} height="400" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
