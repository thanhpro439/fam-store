import { createContext, useEffect, useState } from 'react';
import productApi from '../api/productApi';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProdiver = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [all_product, setAll_product] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await productApi.getAll();
        const data = res.data;
        setAll_product(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllProduct();

    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/cart/getcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.log(error));
    }

    const fetchMenuList = async () => {
      try {
        const res = await productApi.getCategory();
        const data = res.data;
        setMenuList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMenuList();
  }, []);

  const addToCartFn = (itemId) => {
    setCartItems((pre) => ({
      ...pre,
      [itemId]: (pre[itemId] || 0) + 1,
    }));

    // check login or not
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/cart/addtocart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
    }
  };

  const removeFromCartFn = (itemId) => {
    setCartItems((pre) => {
      return {
        ...pre,
        [itemId]: Math.max(0, pre[itemId] - 1),
      };
    });

    // check login or not
    if (localStorage.getItem('auth-token')) {
      fetch(`${BASE_URL}/cart/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
    }
  };

  const getTotalCartNumberFn = () => {
    return Object.values(cartItems).reduce((pre, current) => pre + current, 0);
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
    menuList,
    cartItems,
    addToCartFn,
    removeFromCartFn,
    getTotalCartAmoutFn,
    getTotalCartNumberFn,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProdiver;
