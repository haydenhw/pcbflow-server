import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children } = props;
  const shouldRender = true;
  
  return (
    <div className="dropdown-trigger">
      {children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  children: PropTypes.object,
  shouldRender: PropTypes.bool
}