import React from 'react';

import generatePriceString from 'helpers/generatePriceString';
import './side-bar-styles/SideBarIconFrame.css';

export default function IconFrame(props) {
  return (
    <div className="icon-frame-container">
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
