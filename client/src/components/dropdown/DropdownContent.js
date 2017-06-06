import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children, isActive } = props;
  
  return (
    <div>
      <ul className="dropdown-content">
        {isActive && children}
      </ul>
    </div>
  );
}

DropdownTrigger.propTypes = {
  isActive: PropTypes.bool.isRequired
}