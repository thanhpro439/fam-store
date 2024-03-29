import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { formatPrice } from '../../util';

function ProductDisplay(props) {
  const { product } = props;
  const { addToCartFn } = useContext(ShopContext);

  return (
    <div className="product-display">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-img-main" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            {formatPrice(product.old_price)}đ
          </div>
          <div className="productdisplay-right-prices-new">
            {formatPrice(product.new_price)}đ
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          aliquid et consectetur adipisci vitae, sequi ullam minima ratione,
          itaque incidunt labore officia! Consectetur velit officia incidunt
          tempora iste iusto dolorem.
        </div>

        {/* TODO add type */}
        {/* <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div> */}
        <button
          onClick={() => {
            addToCartFn(product.id);
          }}
        >
          ADD TO CARD
        </button>
        <p className="productdisplay-right-category">
          <span>Category: </span> Women, T-Shirt, Crop top
        </p>
        <p className="productdisplay-right-category">
          <span>Tag: </span> Modern, Lastest
        </p>
      </div>
    </div>
  );
}

export default ProductDisplay;
