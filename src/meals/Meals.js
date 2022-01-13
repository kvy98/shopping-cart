import React, { useContext, useState, useRef } from "react";
import {
  CartContext,
  CartContextAction,
  CART_CONTEXT_ENUM_ACTION,
} from "../context/CartContext";
import "./meals.scss";
import kem from "./../assets/kem-chong-nhuc.jpeg";
import nuocep from "./../assets/nuoc-ep-qua-bao.png";
import rohto from "./../assets/rohto-vita.jpeg";
const MealItem = (props) => {
  const { meal, handleAddToCart } = props;
  const { name, imgPath, price } = meal;
  const [quantity, setQuantity] = useState(1);
  const ref = useRef(null);
  return (
    <li className="meal__item">
      <img src={imgPath} className="meal__item__img" alt={`${name}`} />
      <span className="meal__item__name">{name}</span>
      <span className="meal__item__price">{price.toFixed(2)}$</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToCart(meal, quantity);
        }}
      >
        <input
          ref={ref}
          name="quantity"
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          step={1}
          onChange={(e) => {
            const value = e.target.value;
            setQuantity(+value);
            ref.current.blur();
          }}
        />
        <button type="submit">Add to cart</button>
      </form>
    </li>
  );
};
const Meals = (props) => {
  const { modifyItems } = useContext(CartContext);
  const meals = [
    {
      name: "Kem chống nhục",
      price: 10.11,
      imgPath: kem,
    },
    {
      name: "Nước ép qủa báo",
      price: 5.11,
      imgPath: nuocep,
    },
    {
      name: "Rohto vita",
      price: 2.22,
      imgPath: rohto,
    },
  ];
  return (
    <section className="meal">
      <ul className="meal__list">
        {meals.map((item, index) => (
          <MealItem
            meal={item}
            key={index}
            handleAddToCart={(item, quantity) => {
              modifyItems(
                CartContextAction(CART_CONTEXT_ENUM_ACTION.UPDATE, {
                  item,
                  quantity,
                })
              );
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default Meals;
export { MealItem };
