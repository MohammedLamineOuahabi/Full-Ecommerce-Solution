import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrder } from "../redux/actions/orderActions";

const OrderPage = ({ match }) => {
  // get orderId from url  using match
  const orderId = match.params.id;

  //get order details from state
  const { order, loading, error } = useSelector(state => state.orderDetails);
  //create dispatch function
  const dispatch = useDispatch();

  useEffect(() => {
    /*
    In the OrderScreen useEffect(), 
    check for the order and also make sure 
    that the order ID matches the ID in the URL. 
    If it does not,then dispatch getOrderDetails() 
    to fetch the most recent order 
    /// if(!order || order._id !== orderId) {
      */
    dispatch(getOrder(orderId));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>place order</h1>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING ADDRESS</h2>
              <strong>Name :</strong>
              {order.user.username}
              <strong>Email :</strong>
              {order.user.email}
              <p>
                <strong>{`Address : `}</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}.</Message>
              ) : (
                <Message variant="danger">Not Delivered.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>{`Payment method : `}</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}.</Message>
              ) : (
                <Message variant="danger">Not paid.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>

              {order.orderItems.length === 0 ? (
                <Message>your order was empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1} xs={3}>
                          <Image src={item.image} alt={item.name} fluid rounded></Image>
                        </Col>
                        <Col>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {`${item.qty} x  ${item.price} = $${item.qty * item.price}`}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>ORDER SUMMARY</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items price</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>

                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
