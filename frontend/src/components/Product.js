import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
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
        <Button className="mt-3" variant="primary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
