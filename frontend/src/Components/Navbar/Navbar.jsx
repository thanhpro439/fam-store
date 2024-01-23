import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';

function Navbar() {
  const [menu, setMenu] = useState('shop');
  const { menuList } = useContext(ShopContext);

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
        {menuList.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setMenu(item.category);
              dropdownToggle();
            }}
          >
            <Link to={`/${item.category}`}>{item.category}</Link>{' '}
            {menu === item.category ? <hr /> : <></>}
          </li>
        ))}
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
