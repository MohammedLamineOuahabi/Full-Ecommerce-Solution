import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserProfile, updateUserProfile } from "../redux/actions/userActions.js";
import FormContainer from "../components/FormContainer.js";
import { Form, Button } from "react-bootstrap";

const ProfilePage = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, SetMessage] = useState("");

  const dispatch = useDispatch();

  const { userLoggedInfo } = useSelector(state => state.userLogin);
  const { loading, error, userProfileInfo } = useSelector(state => state.userProfile);
  const { success, userUpdatedInfo } = useSelector(state => state.userProfileUpdate);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // if not login redirect user to login page
    if (!userLoggedInfo) {
      history.push("/login");
    } else {
      //if no profile info get profile
      if (!userProfileInfo) {
        dispatch(getUserProfile());
      } else {
        setUsername(userProfileInfo.username);
        setEmail(userProfileInfo.email);
      }
    }
  }, [dispatch, history, userProfileInfo, userLoggedInfo]);

  const submitHandler = e => {
    e.preventDefault();
    //check if password & confirmPassword are identical
    if (password !== confirmPassword) {
      SetMessage("Please verify your passwords");
    } else {
      dispatch(updateUserProfile({ username, email, password }));
    }
  };
  return (
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
  );
};
export default ProfilePage;
