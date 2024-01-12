import React, { useContext } from 'react';
import './RelatedProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';

function RelatedProducts(props) {
  const { all_product } = useContext(ShopContext);
  const { product } = props;

  return (
    <div className="relatedproducts">
      <h1>RELATED ITEM</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item, index) => {
          if (product.category === item.category) {
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
    </div>
  );
}

export default RelatedProducts;
