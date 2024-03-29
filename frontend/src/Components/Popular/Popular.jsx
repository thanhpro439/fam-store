import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

function Popular() {
  const [popular, setPopular] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/products/popular`)
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <div className="popular">
      <h1>MOST POPULAR</h1>
      <hr />
      <div className="popular-item">
        {popular?.map((item, index) => {
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
        })}
      </div>
    </div>
  );
}

export default Popular;
