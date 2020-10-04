import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails } from "../redux/actions/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

import Rating from "../components/Rating";

const ProductPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    console.log(match.params.id);
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const { loading, error, product } = useSelector(state => state.productDetails);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        GO BACK
      </Link>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            {/* /// using fluid to force image to stay inside the container */}
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating} numReviews={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>{`Price : ${product.price}`}</ListGroup.Item>
              <ListGroup.Item>{`Description : ${product.description}`}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.inStock ? "in Stock" : "Out of stock"}</Col>
                  </Row>
                </ListGroupItem>
                {product.inStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                        >
                          {[...Array(product.inStock).keys()].map(x => (
                            <option key={x + 1} vale={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
                    className="btn btn-block"
                    type="button"
                    disabled={product.inStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
