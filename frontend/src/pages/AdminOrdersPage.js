import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getOrders } from "../redux/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminOrdersPage = ({ history }) => {
  const dispatch = useDispatch();

  const { userLoginInfo } = useSelector(state => state.userLoginState);

  //get states
  const _ordersList = useSelector(state => state.orderListState);
  const {
    loading: loadingOrders,
    success: successOrders,
    error: errorOrders,
    orders
  } = _ordersList;

  useEffect(() => {
    //check if login
    if (!userLoginInfo) {
      history.push("/login");
    }
    //check if admin
    if (!userLoginInfo.isAdmin) {
      history.push("/");
    }
    //check if order listed
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, [history, dispatch, successOrders, orders, userLoginInfo]);

  /*   const deleteHandler = id => {
    if (window.confirm("Are you sure !")) {
      dispatch(deleteUser(id));
    }
  }; */
  return (
    <>
      <h1>Orders</h1>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
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
    </>
  );
};

export default AdminOrdersPage;
