import React, { useState } from 'react';
import './SearchProduct.css';
import remove_icon from '../../assets/cross_icon.png';
import { formatPrice } from '../../util';
import Preloader from '../Preloader/Preloader';

function SearchProduct(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSearchActive, setSearchActive] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const searchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/products/search/${searchTerm}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // Định dạng giá của sản phẩm trước khi cập nhật state
        const formattedProducts = data?.map((product) => ({
          ...product,
          old_price: formatPrice(product.old_price),
          new_price: formatPrice(product.new_price),
        }));
        setProducts(formattedProducts);
        setIsLoading(false);
      } else {
        setProducts(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while fetching data');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchProduct();
    }
  };

  return (
    <div className="searchproduct">
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter product name"
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button
          onClick={() => {
            searchProduct();
          }}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          {products?.error ? (
            <p>{products?.error}</p>
          ) : (
            <div className="listproduct">
              <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
              </div>
              <div className=" listproduct-allproduct">
                <hr key="hr" />
                {products?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="listproduct-format-main listproduct-format"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="listproduct-product-image"
                      />
                      <p>{product.name}</p>
                      <p>{product.old_price}đ</p>
                      <p>{product.new_price}đ</p>
                      <p>{product.category}</p>
                      <img
                        src={remove_icon}
                        alt=""
                        className="listproduct-remove-icon"
                        onClick={() => {
                          remove_product(product.id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
