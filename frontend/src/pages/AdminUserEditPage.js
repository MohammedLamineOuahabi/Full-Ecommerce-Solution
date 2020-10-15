import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUser, updateUser } from "../redux/actions/userActions.js";
import userActionTypes from "../redux/constants/userActionTypes";
import FormContainer from "../components/FormContainer.js";
import { Form, Button } from "react-bootstrap";

const UserEditPage = ({ history, match }) => {
  const userId = match.params.id;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, userProfileInfo } = useSelector(state => state.userProfileState);
  const { success } = useSelector(state => state.userUpdateState);

  useEffect(() => {
    if (success) {
      dispatch({ type: userActionTypes.USER_UPDATE_RESET });
      dispatch({ type: userActionTypes.USER_DETAILS_RESET });
      history.push(`/admin/users`);
    } else {
      if (!userProfileInfo || userProfileInfo._id !== userId) {
        //|| userProfileInfo._id !== userId
        dispatch(getUser(userId));
      } else {
        setUsername(userProfileInfo.username);
        setEmail(userProfileInfo.email);
        setIsAdmin(userProfileInfo.isAdmin);
      }
    }
  }, [dispatch, userId, userProfileInfo, success, history]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, username, email, isAdmin }));
  };
  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>edit user</h1>
        {/* add error & message & loading update later */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>username </Form.Label>
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditPage;
