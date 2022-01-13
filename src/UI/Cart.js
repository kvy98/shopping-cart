import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import {
  CartContext,
  CartContextAction,
  CART_CONTEXT_ENUM_ACTION,
} from "../context/CartContext";
import "./cart.scss";
import Modal from "./Modal";
const Cart = (props) => {
  const ref = useRef(null);
  const { items, modifyItems } = useContext(CartContext);
  const total = items.reduce((prev, item) => item.quantity + prev, 0) || 0;
  let className = "cart";
  const [isAnimation, setisAnimation] = useState(false);
  const [isFirstLoad, setIsFirsLoad] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  if (isAnimation) {
    className += ` ${className}--modify`;
  }
  useLayoutEffect(() => {
    setIsFirsLoad(false);
  }, []);
  useEffect(() => {
    if (isFirstLoad) return;
    setisAnimation(true);
    const timeOut = setTimeout(() => {
      setisAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [total]);
  return (
    <Fragment>
      {isShowModal && (
        <Modal
          items={items}
          handleUpdateCart={(items) => {
            modifyItems(
              CartContextAction(CART_CONTEXT_ENUM_ACTION.EDIT_ALL, { items })
            );
            console.log(items);
          }}
          handleDispose={() => setIsShowModal(false)}
        />
      )}
      <div
        className={className}
        onClick={() => {
          setIsShowModal(true);
        }}
        ref={ref}
      >
        <div className="cart__content">
          <span className="cart__text">Cart:</span>
          <span className="cart__badge-number">{total}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
