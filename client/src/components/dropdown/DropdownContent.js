import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownTrigger(props) {
  const { children, isActive } = props;

  const renderContent = () => {
    const { isActive } = props;

    if (isActive) {
      return (
        <ul className="dropdown-content">
          {children}
        </ul>
      );

      return null;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}

DropdownTrigger.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
