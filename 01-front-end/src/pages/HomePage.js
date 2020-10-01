import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Products from "../products";

const Home = () => {
  return (
    <>
      <h1 className="my-5">welcome to MATJAR!</h1>
      <h2 className="my-5">Latest products</h2>
      <Row className="text-left py-3 ">
        {Products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
