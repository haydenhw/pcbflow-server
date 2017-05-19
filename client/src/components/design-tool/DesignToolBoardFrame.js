import React from 'react';
import * from './design-tool-styles/DesignToolBoardFrame.css';
export default function DesignToolBoardFrame(props) {
  
  const style={
    width: "500px",
    height: "500px"
  }
  return (<div className="board-frame" style={style}></div>)
}