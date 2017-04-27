import React from 'react';
import './footer-styles/Footer.css';

export default function Footer(props) {
  const timeLastSaved = (
    <div className="time-last-saved footer-wrapper">
      <span>Last saved: </span>
      <span>{props.timeLastSaved}</span>
    </div>
  );

  return (
    <div className="footer">
      <div className="project-price footer-wrapper">
        <span>Price/Unit: </span>
        <span>{props.price}</span>
      </div>
      {props.timeLastSaved && timeLastSaved}
    </div>
  );
}

