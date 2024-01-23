import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.png';
import list_product_icon from '../../assets/Product_list_icon.png';
import search_product_icon from '../../assets/search_icon.png';

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/allproduct" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>

      <Link to="/searchproduct" style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={search_product_icon} alt="" />
          <p>Search</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
