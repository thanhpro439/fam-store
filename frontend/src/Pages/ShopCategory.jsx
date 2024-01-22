import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

function ShopCategory(props) {
  const { category, count } = props;
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      {/* <img className='shop-category-banner' src={props.banner} alt="" /> */}
      <div className="shop-category-indexSort">
        <p>
          <span>Showing 1-{12 >= count ? count : 12}</span> out of {count}{' '}
          products.
        </p>
        <div className="shop-category-soft">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shop-category-products">
        {all_product.map((item, index) => {
          if (category === item.category) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      {12 >= count ? (
        <></>
      ) : (
        <div className="shop-category-loadmore">Explore More</div>
      )}
    </div>
  );
}

export default ShopCategory;
