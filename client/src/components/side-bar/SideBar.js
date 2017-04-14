import React, { Component } from 'react';

import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';
import DimensionForm from './SideBarDimensionForm';
import './side-bar-styles/SideBar.css'

export default function SideBar(props) {
  const style = {
    "height": "100% !important",
    "width": "200px",
    "position": "fixed",
    "zIndex": "1", 
    "left": "0px",
    "verticalAlign": "top"
  }
  
  return (
    <div className="sideBar" style={style}>
      <div className="module-container">
        <SideBarIconList 
          toggleDraggingToBoard={props.toggleDraggingToBoard} 
          toggleIsClicked={props.toggleIsClicked}
        />
      </div>
      <DimensionForm />
    </div>
  );
}