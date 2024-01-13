import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

function CartItems(props) {
  const { all_product, cartItems, removeFromCartFn, getTotalCartAmoutFn } = useContext(ShopContext);

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cart-items-format-main cart-items-format">
                <Link to={`/product/${e.id}`}>
                  <img className="cart-icon-product-icon" src={e.image} alt="" />{' '}
                </Link>
                <p>{e.name}</p>
                <p className="cart-items-subtotal">{e.new_price}</p>
                <button className="cart-items-quantity">{cartItems[e.id]}</button>
                <p>{e.new_price * cartItems[e.id]}</p>
                <img
                  className="cart-items-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCartFn(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        } else return null;
      })}

      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Total</h1>
          <div>
            <div className="cart-items-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmoutFn(cartItems, all_product)}</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-items-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmoutFn()}</h3>
            </div>
            <button>PROCESS TO CHECKOUT</button>
          </div>
        </div>

        <div className="cart-items-promocode">
          <p>Promotions</p>
          <div className="cart-items-promobox">
            <input type="text" name="" id="" placeholder="Enter Coupon" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
