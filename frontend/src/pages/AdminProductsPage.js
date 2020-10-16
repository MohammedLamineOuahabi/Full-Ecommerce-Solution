import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { listProducts, deleteProduct, createProduct } from "../redux/actions/productActions";
import productActionTypes from "../redux/constants/productActionTypes";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate.js";

const AdminProductsPage = ({ history, match }) => {
  const pageNumber = match.params.page || 1;
  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(state => state.productListState);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(
    state => state.productDeleteState
  );
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product
  } = useSelector(state => state.productCreateState);
  const _userLogin = useSelector(state => state.userLoginState);
  const { userLoginInfo } = _userLogin;
  //get the page number
  useEffect(() => {
    dispatch({ type: productActionTypes.PRODUCT_CREATE_RESET });
    //if not login redirect to login
    if (!userLoginInfo) {
      history.push(`/login`);
    }
    //if  login but not Admin redirect to /
    if (userLoginInfo && !userLoginInfo.isAdmin) {
      history.push(`/`);
    }
    //if product created redirect to product edit page
    if (successCreate) {
      history.push(`/admin/products/${product._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [history, dispatch, userLoginInfo, successDelete, successCreate, product, pageNumber]);

  const deleteProductHandler = id => {
    if (window.confirm("Are you sure !")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
          <Col className="text-right">
            <Button className="my-3" onClick={createProductHandler}>
              <i className="fas fa-plus mr-2"></i>create new product
            </Button>
          </Col>
        </Col>
      </Row>

      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete || loadingCreate || loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <td>ID</td>
                <td>NAME</td>
                <td>PRICE</td>
                <td>CATEGORY</td>
                <td>BRAND</td>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} isAdmin={true} pages={pages}></Paginate>
        </>
      )}
    </>
  );
};

export default AdminProductsPage;
