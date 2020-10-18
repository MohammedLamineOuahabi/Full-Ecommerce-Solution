import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions.js";
import Product from "../components/Product.js";

import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import Paginate from "../components/Paginate.js";
import ProductsCarousel from "../components/ProductsCarousel.js";

const HomePage = ({ match }) => {
  const dispatch = useDispatch();
  const _productList = useSelector(state => state.productListState);
  const { loading, error, products, pages, page } = _productList;

  //get the keyword
  const keyword = match.params.keyword || "";
  //get the page number
  const pageNumber = match.params.page || 1;

  // **  load products one time
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1 className="my-5">welcome to MATJAR!</h1>
      {loading ? (
        <Loader>Loading ...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {!keyword && <ProductsCarousel />}
          <h2 className="my-5">Latest products</h2>
          <Row className="text-left py-3 ">
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Route render={({ history }) => <Product history={history} product={product} />} />
              </Col>
            ))}
          </Row>
          <Paginate keyword={keyword ? keyword : ""} page={page} pages={pages}></Paginate>
        </>
      )}
    </>
  );
};

export default HomePage;
