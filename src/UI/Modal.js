import React, { Fragment, useReducer, useState } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

const root = document.getElementById("overplay");
const ModalCartItem = (props) => {
  const {
    item: { name, price, quantity },
    handleChangeQuantity,
    handleDeleteItem,
  } = props;
  return (
    <li className="modal__cart-item">
      <span>{name}</span>
      <span>{price.toFixed(2)}$</span>
      <span>x{quantity}</span>
      <div
        className="modal__cart-item__control"
        onClick={(e) => {
          const { name: type } = e.target;
          if (type === "increment") handleChangeQuantity(name, quantity + 1);
          else handleChangeQuantity(name, quantity - 1);
        }}
      >
        <button name="increment">+</button>
        <button name="decrement" disabled={quantity === 1 ? true : false}>
          -
        </button>
      </div>
      <button className="btn btn--close" onClick={() => handleDeleteItem(name)}>
        X
      </button>
    </li>
  );
};

const Modal = (props) => {
  const { handleUpdateCart, handleDispose } = props;
  const [items, dispatch] = useReducer((prevItems, action) => {
    const { type, value } = action;
    let newItems = prevItems.map((item) => ({ ...item }));
    const { name, quantity = 0 } = value;
    if (type === "UPDATE") {
      const index = newItems.findIndex((item) => item.name === name);
      newItems[index].quantity = quantity;
    } else if (type === "DELETE") {
      newItems = newItems.filter((item) => item.name !== name);
    }
    return [...newItems];
  }, props.items);
  const totalAmount = items.reduce(
    (prev, current) => current.quantity * current.price + prev,
    0
  );
  return (
    <Fragment>
      {createPortal(
        <div className="overplay__bg" onClick={handleDispose}></div>,
        root
      )}
      {createPortal(
        <div className="overplay__modal">
          {items.length > 0 ? (
            <Fragment>
              <ul className="modal__list">
                {items.map((item) => (
                  <ModalCartItem
                    key={item.name}
                    item={item}
                    handleChangeQuantity={(name, quantity) => {
                      dispatch({ type: "UPDATE", value: { name, quantity } });
                    }}
                    handleDeleteItem={(name) => {
                      dispatch({ type: "DELETE", value: { name } });
                    }}
                  />
                ))}
              </ul>
              <span className="modal__total-amount">
                Toltal: {totalAmount.toFixed(2)}$
              </span>
            </Fragment>
          ) : (
            <div className="modal__empty">Cart is empty</div>
          )}

          <button
            onClick={() => {
              handleUpdateCart(items);
              handleDispose();
            }}
            className="btn btn--submit"
          >
            OK
          </button>
        </div>,
        root
      )}
    </Fragment>
  );
};

export default Modal;
