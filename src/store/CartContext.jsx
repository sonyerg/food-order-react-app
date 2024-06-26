import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [
    //{item: {id, quantity, ...}}
  ],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //check if item is already in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); //finds and returns the index of the item if the condition is satisfied.

    const updatedItems = [...state.items]; // copy of old array

    // existingCartItemIndex > -1 means the item is already existing.
    // findIndex returns -1 if item not found
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem, //add the existing item
        quantity: existingItem.quantity + 1,
      };

      //override the existingCartItemIndex with the updatedItem
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id // just need the id not the item
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1); // splice(index, 'how many remove?')
    } else {
      const updatedItem = {
        ...existingCartItem, // spread old item state
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // update selected item
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
