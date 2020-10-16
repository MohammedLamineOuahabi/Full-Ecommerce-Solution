import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTopProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductsCarousel = () => {
  const dispatch = useDispatch();
  const _productsTopRated = useSelector(state => state.productTopState);
  const { loading: loadingTop, error: errorTop, products } = _productsTopRated;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return loadingTop ? (
    <Loader />
  ) : errorTop ? (
    <Message variant="danger">{errorTop}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image src={`/uploads/${product.image}`} alt={product.name} fluid></Image>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
