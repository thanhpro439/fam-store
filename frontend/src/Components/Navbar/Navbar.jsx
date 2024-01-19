import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

function Navbar() {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartNumberFn } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdownToggle = () => {
    menuRef.current.classList.toggle('nav-menu-visible');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <Link to="/">
          <p>Fam Store</p>
        </Link>
      </div>

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu('shop');
            dropdownToggle();
          }}
        >
          <Link to="/">Shop</Link> {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('men');
            dropdownToggle();
          }}
        >
          <Link to="/men">Men</Link> {menu === 'men' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('women');
            dropdownToggle();
          }}
        >
          <Link to="/women">Women</Link> {menu === 'women' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('kids');
            dropdownToggle();
          }}
        >
          <Link to="/kids">Kids</Link> {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button
            onClick={() => {
              localStorage.removeItem('auth-token');
              window.location.replace('/');
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartNumberFn()}</div>
      </div>

      <img
        className="nav-dropdown"
        onClick={dropdownToggle}
        src={nav_dropdown}
        alt=""
      />
    </div>
  );
}

export default Navbar;
