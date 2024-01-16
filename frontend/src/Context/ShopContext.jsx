import { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const ShopContextProdiver = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCartFn = (itemId) => {
    setCartItems((pre) => ({
      ...pre,
      [itemId]: (pre[itemId] || 0) + 1,
    }));
  };

  const removeFromCartFn = (itemId) => {
    setCartItems((pre) => {
      return {
        ...pre,
        [itemId]: Math.max(0, pre[itemId] - 1),
      };
    });
  };

  const getTotalCartNumberFn = () => {
    return Object.values(cartItems).reduce((pre,current)=>pre+current,0)
  };

  const getTotalCartAmoutFn = () => {
    let total = 0;
    for (const item of all_product) {
      if (cartItems[item.id] > 0) {
        total += item.new_price * cartItems[item.id];
      }
    }

    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCartFn,
    removeFromCartFn,
    getTotalCartAmoutFn,
    getTotalCartNumberFn
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProdiver;
