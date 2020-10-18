import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product, history }) => {
  const addToCartHandler = () => {
    history.push(`/cart/${product._id}`);
  };
  return (
    <Card className="my-3  rounded">
      <Card.Img variant="top" src={`/uploads/${product.image}`} />
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div" className="X">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">{product.price}</Card.Text>

        <Button
          onClick={addToCartHandler}
          className="btn btn-block"
          type="button"
          disabled={product.inStock === 0}
        >
          {product.inStock === 0 ? "Out of stock" : "Add to Cart"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
