import React, { Component } from 'react';

import SideBarIconList from './SideBarIconList';
import SideBarIcon from './SideBarIcon';

export default function SideBar(props) {
  const style = {
    "height": "100%",
    "width": "100px",
    "position": "absolute",
    "backgroundColor": "white",
    "zIndex": "1", 
    "left": "0px",
    "verticalAlign": "top"
  }
  
  return (
    <div style={style}>
      This is a side bar
      <SideBarIconList 
        toggleDraggingToBoard={props.toggleDraggingToBoard} 
        toggleIsClicked={props.toggleIsClicked}
      />
    </div>
  );
}