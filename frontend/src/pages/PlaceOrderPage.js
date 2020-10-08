import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";

import Message from "../components/Message";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { addOrder } from "../redux/actions/orderActions.js";

const PlaceOrder = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { order, success, error } = useSelector(state => state.orderCreate);

  //calc prices

  //add decimal
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //calc items prices
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.itemsPrice = addDecimals(cart.itemsPrice);
  //calc shipping
  cart.shippingPrice = cart.itemsPrice > 100 ? 10 : 0;
  cart.shippingPrice = addDecimals(cart.shippingPrice);
  //calc tax
  cart.taxPrice = Number(0.15 * cart.itemsPrice);
  cart.taxPrice = addDecimals(cart.taxPrice);
  //calc Total

  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);
  cart.totalPrice = addDecimals(cart.totalPrice);
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);
  const placeOrderHandler = () => {
    dispatch(
      addOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>place order</h1>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING ADDRESS</h2>
              <p>
                <strong>{`Address : `}</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>{`Payment method : `}</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>

              {cart.cartItems.length === 0 ? (
                <Message>your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="bnt-block"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default PlaceOrder;
