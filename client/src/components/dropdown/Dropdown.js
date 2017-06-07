import React from 'react';
import PropTypes from 'prop-types';
import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';

export default function DropdownMenu(props) {
  const { className, children } = props;

  return (
    <div className={`dropdown ${className || ''}`}>
      {children}
    </div>
  );
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
};
