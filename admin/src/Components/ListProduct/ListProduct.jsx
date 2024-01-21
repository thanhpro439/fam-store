import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png';

function ListProduct(props) {
  const [allProduct, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch('https://backend-lpgv.onrender.com/api/products/allproducts');
      const data = await res.json();
      setAllProduct(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const remove_product = async (id) => {
    try {
      // delete image of this product
      await fetch('https://backend-lpgv.onrender.com/api/delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      // delete product in database
      await fetch('https://backend-lpgv.onrender.com/api/products/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      // update list product
      await fetchInfo();
    } catch (error) {
      console.log('Error on removing this item!', error);
    }
  };

  // Run fetchInfor whenever this component mounted
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="listproduct">
      <h1>All Product List</h1>
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
        {allProduct?.map((product, index) => {
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
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
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
  );
}

export default ListProduct;
