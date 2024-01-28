import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import SearchProduct from '../../Components/SearchProduct/SearchProduct';

function Admin(props) {
  return (
    <div className="admin">
      <Sidebar />

      <Routes>
        <Route path="/" element={<AddProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/allproduct" element={<ListProduct />} />
        <Route path="/searchproduct" element={<SearchProduct />} />
      </Routes>
    </div>
  );
}

export default Admin;
