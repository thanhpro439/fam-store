import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../util';
import { Link, useParams } from 'react-router-dom';
import './Search.css';

function Search(props) {
  const { productName } = useParams();
  const [searchTerm, setSearchTerm] = useState(productName);
  const [products, setProducts] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchProduct();
    }
  };

  const searchProduct = async () => {
    try {
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
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while fetching data');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    if (productName) {
      searchProduct();
    }
  }, []);

  return (
    <div className="searchproduct">
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter product name"
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={() => {
            searchProduct();
          }}
        >
          Search
        </button>
      </div>

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
            </div>
            <div className=" listproduct-allproduct">
              <hr key="hr" />
              {products?.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="listproduct-format-main listproduct-format"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        onClick={scrollToTop}
                        src={product.image}
                        alt=""
                        className="listproduct-product-image"
                      />
                    </Link>

                    <p>{product.name}</p>
                    <p>{product.old_price}đ</p>
                    <p>{product.new_price}đ</p>
                    <p>{product.category}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
