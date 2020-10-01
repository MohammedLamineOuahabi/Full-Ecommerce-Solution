import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options" to="/shop">
      <Link className="option" to="/">
        Home
      </Link>{" "}
      <Link className="option" to="/shop">
        Shop
      </Link>
      <Link className="option" to="/contact">
        Contact
      </Link>{" "}
      <Link className="option" to="/signin">
        Signin
      </Link>
    </div>
  </div>
);

export default Header;
