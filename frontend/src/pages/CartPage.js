import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Form, Button, Image, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../redux/actions/cartActions.js";
import Message from "../components/Message.js";

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cartState);

  // Get id cart/5f77832abe6d511fd0750781?qty=3
  const productId = match.params.id;

  // Get Qty cart/5f77832abe6d511fd0750781?qty=3
  //if no qty then set qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //if logged-in then redirect to shipping
    history.push("/login?redirect=shipping");
  };
  return (
    <div>
      <h1>Shopping cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              your cart is empty! <Link to="/">GO BACK</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={2}>
                      <Image src={`/uploads/${item.image}`} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.id}`}></Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={e => dispatch(addToCart(item.id, Number(e.target.value)))}
                      >
                        {[...Array(item.inStock).keys()].map(x => (
                          <option key={x + 1} vale={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtitle(
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  )items
                </h3>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
