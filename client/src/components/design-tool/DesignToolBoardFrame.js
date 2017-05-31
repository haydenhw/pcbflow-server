import React from 'react';

export default function DesignToolBoardFrame(props) {
  const style = {
    position: 'absolute',
    top: props.top,
    left: props.left,
    width: props.width,
    height: props.height,
  };

  return <div className="board-frame" style={style} />;
}
