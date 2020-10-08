import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button, Col } from "react-bootstrap";

import { savePaymentMethod } from "../redux/actions/cartActions.js";

import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";

const PaymentPage = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  //if no shipping address redirect to shipping page
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 stp3 />
      <h1>shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/*             <Form.Check
              type="radio"
              label="Strip"
              id="Strip"
              name="paymentMethod"
              value="Strip"
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
