import React from 'react';

import generatePriceString from 'helpers/generatePriceString';
import './side-bar-styles/SideBarIconFrame.css';

export default function IconFrame(props) {
  const fadeOut = {
    opacity: '0.3'
  };
  return (
    <div 
      className={`icon-frame-container id${props.id}`}
      style={props.disabled ? fadeOut : {} }
    >
      <div className="icon-frame-title">
        {props.moduleName}
      </div>
      <div className="icon-frame-body">
        {props.children}
      </div>
      <div className="icon-frame-price">
        {generatePriceString(props.modulePrice)}
      </div>
    </div>
  );
}
