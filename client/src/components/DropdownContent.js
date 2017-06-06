import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children, isActive } = props;
  
  return (
    <ul className="dropdown-content">
      {isActive && children}
    </ul>
  );
}

DropdownTrigger.propTypes = {
  children: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired
}