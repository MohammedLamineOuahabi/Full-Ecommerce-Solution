import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails, reviewProduct } from "../redux/actions/productActions.js";
import productActionTypes from "../redux/constants/productActionTypes.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

import Rating from "../components/Rating";

const ProductPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { loading, error, product } = useSelector(state => state.productDetailsState);
  const { userLoggedInfo } = useSelector(state => state.userLogin);
  const { loading: loadingRating, error: errorRating, success: successRating } = useSelector(
    state => state.productReviewState
  );
  const productId = match.params.id;
  useEffect(() => {
    if (successRating) {
      setRating(0);
      setComment("");
      dispatch({ type: productActionTypes.PRODUCT_REVIEW_RESET });
    }
    dispatch(listProductDetails(productId));
  }, [dispatch, match, successRating, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(reviewProduct(productId, { rating, comment }));
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
        <>
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
          <Row>
            <Col md={6}>
              <h2>reviews</h2>
              {product.reviews.length === 0 && <Message>no reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <span>{review.name}</span>
                    <Rating rating={review.rating} numReviews={review.numReviews}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>write a customer review</h2>
                  {errorRating && <Message variant="danger">{errorRating}</Message>}
                  {!userLoggedInfo ? (
                    <Message>please sign in to write a review </Message>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">select</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="submit">
                        <Button className="btn btn-block" type="submit" variant="primary">
                          submit
                        </Button>
                      </Form.Group>
                    </Form>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
