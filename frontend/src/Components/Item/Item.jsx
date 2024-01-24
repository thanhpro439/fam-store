import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../util';


function Item(props) {
  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={scrollToTop} src={props.image} alt="" />
      </Link>
      <p>
        {props.name.length > 50 ? props.name.slice(0, 50) + '...' : props.name}
      </p>
      <div className="item-prices">
        <div className="item-price-new">{formatPrice(props.new_price)}đ</div>
        <div className="item-price-old">{formatPrice(props.old_price)}đ</div>
      </div>
    </div>
  );
}

export default Item;
