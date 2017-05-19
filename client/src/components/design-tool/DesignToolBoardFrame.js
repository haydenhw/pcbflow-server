import React from 'react';
import './design-tool-styles/DesignToolBoardFrame.css';
export default function DesignToolBoardFrame(props) {
  
  const style= {
    width: props.width,
    height: props.height,
    top: props.top,
    left: props.left
  }
  
  return (<div className="board-frame" style={style}></div>)
}