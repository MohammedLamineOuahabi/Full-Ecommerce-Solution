import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUser, updateUser } from "../redux/actions/userActions.js";
import { myOrders } from "../redux/actions/orderActions.js";
import FormContainer from "../components/FormContainer.js";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProfilePage = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, SetMessage] = useState("");

  const dispatch = useDispatch();

  const _userLogin = useSelector(state => state.userLoginState);
  const { userLoginInfo } = _userLogin;
  const _userUpdate = useSelector(state => state.userUpdateState);
  const { success } = _userUpdate;
  const _userProfile = useSelector(state => state.userProfileState);
  const { loading, error, userProfileInfo } = _userProfile;
  const _myOrdersList = useSelector(state => state.orderMyOrdersState);
  const { loadingMyOrders, errorMyOrders, orders } = _myOrdersList;

  useEffect(() => {
    console.log("in useEffect");
    // if not login redirect user to login page
    if (!userLoginInfo) {
      history.push("/login");
    } else {
      console.log("in useEffect logged");

      //if no profile info get profile
      if (!userProfileInfo) {
        console.log("in useEffect !userProfileInfo");
        dispatch(getUser());
        dispatch(myOrders());
      } else {
        setUsername(userProfileInfo.username);
        setEmail(userProfileInfo.email);
      }
    }
  }, [dispatch, history, userProfileInfo, userLoginInfo]);

  const submitHandler = e => {
    e.preventDefault();
    //check if password & confirmPassword are identical
    if (password !== confirmPassword) {
      SetMessage("Please verify your passwords");
    } else {
      dispatch(updateUser({ username, email, password }));
    }
  };
  return (
    <>
      <Row>
        <Col>
          <FormContainer>
            <h1>Profile </h1>
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile updated Successfully</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>username address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
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
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm password </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Col>

        <Col>
          <h2>My orders</h2>
          {loadingMyOrders ? (
            <Loader />
          ) : errorMyOrders ? (
            <Message variant="danger">{errorMyOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times" style={{ color: "red" }}></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/orders/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;
