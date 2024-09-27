import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GenreSort = ({ handleSelectGenre }) => {
  return (
    <Container fluid>
      <Row style={{ cursor: "pointer" }}>
        <Col onClick={() => handleSelectGenre("Horror")}>Horror</Col>
        <Col onClick={() => handleSelectGenre("Fantasy")}>Fantasy</Col>
        <Col onClick={() => handleSelectGenre("Science Fiction")}>
          Science Fiction
        </Col>
        <Col onClick={() => handleSelectGenre("Romance")}>Romance</Col>
        <Col onClick={() => handleSelectGenre("Thriller")}>Thriller</Col>
        <Col onClick={() => handleSelectGenre("Mystery")}>Mystery</Col>
        <Col onClick={() => handleSelectGenre("Non-Fiction")}>Non-Fiction</Col>
      </Row>
    </Container>
  );
};

export default GenreSort;
