import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productAction.js";
import Product from "../components/Product.js";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.productList);

  // **  load products one time
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="my-5">welcome to MATJAR!</h1>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="text-left py-3 ">
          <h2 className="my-5">Latest products</h2>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
