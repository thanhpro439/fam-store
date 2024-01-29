import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown.png';
import default_avatar from '../Assets/default_avatar.png';
import search_icon from '../Assets/search_icon.png';

function Navbar() {
  const [menu, setMenu] = useState(localStorage.getItem('menu') || 'shop');
  const { menuList } = useContext(ShopContext);

  const { getTotalCartNumberFn } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdownToggle = () => {
    menuRef.current.classList.toggle('nav-menu-visible');
  };

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [productName, setProductName] = useState('');
  const inputRef = useRef(null);
  const username = localStorage.getItem('username')
    ? localStorage.getItem('username')[0]
    : '';

  const toggleSearchActive = () => {
    setIsSearchActive(!isSearchActive);
  };
  const toggleLoginActive = () => {
    setIsLogin(!isLogin);
  };

  const saveMenu = (menu) => {
    localStorage.setItem('menu', menu);
    setMenu(menu);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.location.assign(`/search/${productName}`);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      // Tự động đặt tiêu điểm khi ô input được hiển thị
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  return (
    <div className="navbar">
      <div
        className="nav-logo"
        onClick={() => {
          saveMenu('');
        }}
      >
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
            saveMenu('shop');
            dropdownToggle();
          }}
        >
          <Link to="/">Shop</Link> {menu === 'shop' ? <hr /> : <></>}
        </li>
        {menuList.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              saveMenu(item.category);
              dropdownToggle();
            }}
          >
            <Link to={`/${item.category}`}>{item.category}</Link>{' '}
            {menu === item.category ? <hr /> : <></>}
          </li>
        ))}
      </ul>

      <div className="nav-login-cart">
        <div className="search-bar">
          <input
            type="search"
            name="search"
            placeholder="Search Product"
            className={`${isSearchActive ? 'active' : ''}`}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus={isSearchActive}
            ref={inputRef}
          />
          <img src={search_icon} alt="" onClick={toggleSearchActive} />
        </div>

        <Link to="/cart">
          <img
            onClick={() => {
              saveMenu('');
            }}
            src={cart_icon}
            alt=""
          />
        </Link>

        {localStorage.getItem('auth-token') ? (
          <div className="login-signup" onClick={toggleLoginActive}>
            {/* <img src={default_avatar} alt="" /> */}
            <div className="user">{username}</div>
            <div
              className={`login-signup-logout ${isLogin ? 'active' : ''}`}
              onClick={() => {
                localStorage.removeItem('auth-token');
                localStorage.removeItem('username');
                window.location.replace('/');
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div
              className="login-signup"
              onClick={() => {
                saveMenu('');
              }}
            >
              <img src={default_avatar} alt="" />
            </div>
          </Link>
        )}

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
