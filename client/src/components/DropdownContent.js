import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children, isActive } = props;
  
  return (
    <div className="dropdown-content">
      {isActive && children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  children: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
}