import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getUsers, deleteUser } from "../redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UsersPage = ({ history }) => {
  const dispatch = useDispatch();

  const { userLoggedInfo } = useSelector(state => state.userLogin);
  const { success: successDeleteUser } = useSelector(state => state.userDeleteState);
  const { loading: loadingUsersList, error: errorUsersList, users } = useSelector(
    state => state.usersListState
  );

  useEffect(() => {
    if (userLoggedInfo && userLoggedInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push(`/login`);
    }
  }, [history, dispatch, successDeleteUser, userLoggedInfo]);

  const deleteHandler = id => {
    if (window.confirm("Are you sure !")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {loadingUsersList ? (
        <Loader />
      ) : errorUsersList ? (
        <Message variant="danger">{errorUsersList}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>ADMIN</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "blue" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersPage;
