import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminUserEditPage from "./pages/AdminUserEditPage";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route path="/search/:keyword/page/:page" component={HomePage} exact />
          <Route path="/page/:page" component={HomePage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />

          <Route path="/products/:id" component={ProductPage} exact />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/orders/:id" component={OrderPage} />

          <Route path="/admin/users" component={AdminUsersPage} exact />
          <Route path="/admin/products" component={AdminProductsPage} exact />
          <Route path="/admin/products/:page" component={AdminProductsPage} exact />
          <Route path="/admin/orders" component={AdminOrdersPage} exact />

          <Route path="/admin/users/:id/edit" component={AdminUserEditPage} exact />
          <Route path="/admin/products/:id/edit" component={AdminProductEditPage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
