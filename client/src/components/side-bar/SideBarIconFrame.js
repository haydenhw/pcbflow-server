import React from 'react';
import './side-bar-styles/SideBarIconFrame.css'

export default function IconFrame(props) {
  return (
    <div className="icon-frame-container">
      <div className="icon-frame-title">
        Standard-A Jack
      </div>
      <div className="icon-frame-body">
        {props.children}
      </div>
      <div className="icon-frame-price">$10.00</div>
    </div>
  )
} 