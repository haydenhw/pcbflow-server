import React from 'react';
import './footer-styles/Footer.css';

export default function Footer(props) {
  console.log(props)
  return (
    <div className="footer">
      <div className="project-price-wrapper">
        <span>Price/Unit: </span>
        <span>{props.price}</span>
      </div>
    </div>
  );
}

