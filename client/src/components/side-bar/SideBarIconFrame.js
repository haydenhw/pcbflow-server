import React from 'react';
import './side-bar-styles/SideBarIconFrame.css'

export default function IconFrame(props) {
  const generatePriceString = (price) => {
    const twoDecimalString = price.toFixed(2);
    return `$${twoDecimalString}`
  }
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
  )
} 