import React, { Fragment } from "react";
import Cart from "../UI/Cart";
import "./header.scss";
const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <Cart />
      </header>
      <div className="header-bg"></div>
    </Fragment>
  );
};

export default Header;
