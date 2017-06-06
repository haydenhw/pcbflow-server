import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children, handleClick } = props;
  
  return (
    <div className="dropdown-trigger" onClick={handleClick}>
      {children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  shouldRender: PropTypes.bool
}