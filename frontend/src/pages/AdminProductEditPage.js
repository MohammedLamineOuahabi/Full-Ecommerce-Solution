import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { productDetails, updateProduct } from "../redux/actions/productActions.js";
import productActionTypes from "../redux/constants/productActionTypes";
import FormContainer from "../components/FormContainer.js";
import { Form, Button } from "react-bootstrap";

const ProductEditPage = ({ history, match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  //get states
  const _productDetails = useSelector(state => state.productDetailsState);
  const _productUpdate = useSelector(state => state.productUpdateState);
  //deconstruct
  const { loading: loadingDetails, error: errorDetails, product } = _productDetails;
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = _productUpdate;

  useEffect(() => {
    //if no product details then list product details
    if (!productDetails) {
      dispatch(productDetails(productId));
    } else if (product && product._id !== productId) {
      dispatch(productDetails(productId));
    } else if (successUpdate) {
      dispatch(productDetails(productId));
      dispatch({ type: productActionTypes.PRODUCT_UPDATE_RESET });
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setInStock(product.inStock);
      setDescription(product.description);
    }
  }, [dispatch, productId, product, successUpdate, history]);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const { data } = await Axios.post(`/api/v1/upload`, formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({ _id: productId, name, image, category, description, brand, price, inStock })
    );
  };
  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>edit product</h1>
        {/* add error & message & loading update later */}
        {loadingDetails || loadingUpdate ? (
          <Loader />
        ) : errorDetails || errorUpdate ? (
          <Message variant="danger">{errorDetails || errorUpdate}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name"
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand "
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="inStock">
              <Form.Label>inStock </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter inStock"
                value={inStock}
                onChange={e => setInStock(e.target.value)}
              ></Form.Control>
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
export default ProductEditPage;
