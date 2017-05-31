import React from 'react';
import PropTypes from 'prop-types';

export default function DesignToolBoardFrame(props) {
  const { width, heght, top, left } = props;
  
  const style = {
    position: 'absolute',
    width: width,
    height: height,
    top: top,
    left: left,
  };

  return <div className="board-frame" style={style} />;
}

DesignToolBoardFrame.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
