import React from 'react';
import './Sketelon.css';
import Shop from '../../Pages/Shop';

function Sketelon(props) {
  return (
    <div className="sketelon">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <Shop />
    </div>
  );
}

export default Sketelon;
