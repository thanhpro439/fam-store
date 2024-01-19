import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

function NewCollections(props) {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollection')
      .then((res) => res.json())
      .then((data) => setNewCollections(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="new-collections-item">
        {newCollections?.map((item, index) => {
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

export default NewCollections;
