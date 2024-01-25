import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Sketelon from './Components/Sketelon/Sketelon';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Footer from './Components/Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from './Context/ShopContext';

function App() {
  const { menuList } = useContext(ShopContext);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />

          {menuList?.map((item, index) => (
            <Route
              key={index}
              path={`/${item.category}`}
              element={
                <ShopCategory category={item.category} count={item.count} />
              }
            />
          ))}

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
