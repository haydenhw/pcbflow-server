import React, { Component } from 'react';

import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';
import DimensionForm from './SideBarDimensionForm';
import './side-bar-styles/SideBar.css'

export default function SideBar(props) {
  const style = {
    "height": "100%",
    "width": "200px",
    "position": "absolute",
    "zIndex": "1", 
    "left": "0px",
    "verticalAlign": "top"
  }
  
  return (
    <div className="sideBar" style={style}>
      <SideBarIconList 
        toggleDraggingToBoard={props.toggleDraggingToBoard} 
        toggleIsClicked={props.toggleIsClicked}
      />
      <DimensionForm />
    </div>
  );
}