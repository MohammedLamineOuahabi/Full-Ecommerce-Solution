import React, { useEffect, useState } from "react";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrder, payOrder, deliverOrder } from "../redux/actions/orderActions";
import orderActionTypes from "../redux/constants/orderActionTypes";

const OrderPage = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const { order, loading, error } = useSelector(state => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPayState);
  const { success: successDeliver } = useSelector(state => state.orderDeliverState);

  const [sdkReady, setSdkReady] = useState(false);

  const addPayPalScript2 = async () => {
    const { data: clientId } = await Axios.get("/api/v1/config/paypal");
    console.log(clientId);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    addPayPalScript2();
    console.log("addPayPalScript");
  }, []);

  useEffect(() => {
    if (!order || successPay || successDeliver) {
      dispatch({ type: orderActionTypes.ORDER_PAY_RESET });
      dispatch({ type: orderActionTypes.ORDER_DELIVERED_RESET });
      dispatch(getOrder(orderId));
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  const setDeliveredHandler = () => {
    dispatch(deliverOrder(orderId));
  };
  const successPaymentHandler = (details, data) => {
    console.log("details :", details);
    console.log("data :", data);
    dispatch(payOrder(orderId, details));
  };

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
              {order.deliveredAt ? (
                <Message variant="success">Delivered on {order.deliveredAt}.</Message>
              ) : (
                <>
                  <Message variant="danger">Not Delivered.</Message>
                  <Button type="button" className="btn btn-block" onClick={setDeliveredHandler}>
                    Mark as delivered
                  </Button>
                </>
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
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
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
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton amount={10} onSuccess={successPaymentHandler} />
                )}
              </ListGroup.Item>
            )}
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
