import { createContext, useReducer } from "react";
const defaultValue = {
  items: [],
  modifyItems: (action) => {},
};
const CartContext = createContext({
  ...defaultValue,
});
const ENUM_ACTION = {
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  EDIT_ALL: "EDIT_ALL",
};
const action = (enumAction, value) => {
  let type = "";
  if (ENUM_ACTION.hasOwnProperty(enumAction)) type = enumAction;
  return { type, value };
};
const useCartReducer = () =>
  useReducer((items, action) => {
    console.log(action);

    const {
      type,
      value: { item = null, quantity = 0 },
    } = action;
    if (!type) return;
    let newItems = items.map((e) => ({ ...e }));
    let index = -1;
    switch (type) {
      case ENUM_ACTION.UPDATE:
        index = newItems.findIndex((_item) => _item.name === item.name);
        if (index !== -1) newItems[index].quantity += quantity;
        else
          newItems.push({
            ...item,
            quantity,
          });
        break;
      case ENUM_ACTION.DELETE:
        newItems = newItems.filter((_item) => _item.name !== item.name);
        break;
      case ENUM_ACTION.EDIT_ALL:
        newItems = action.value.items;
        break;
      default:
        break;
    }
    return [...newItems];
  }, defaultValue.items);

const CartContextProvider = (props) => {
  const [items, dispatch] = useCartReducer();
  return (
    <CartContext.Provider value={{ items: items, modifyItems: dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
export {
  action as CartContextAction,
  ENUM_ACTION as CART_CONTEXT_ENUM_ACTION,
  CartContext,
  CartContextProvider,
};
