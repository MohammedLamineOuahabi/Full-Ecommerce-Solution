import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../redux/actions/userActions.js";
import FormContainer from "../components/FormContainer.js";
import { Form, Button, Row, Col } from "react-bootstrap";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const _userLogin = useSelector(state => state.userLoginState);
  const { loading, error, userLoginInfo } = _userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userLoginInfo) {
      // if login success the redirect
      history.push(redirect);
    }
  }, [history, redirect, userLoginInfo]);

  const submitHandler = e => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            New customer? Please Register
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>{` here . `}</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
