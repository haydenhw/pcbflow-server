import React from 'react';
import PropTypes from 'prop-types';

import './top-navbar-styles/TopNavbarButtons.css';

export default function TopNavbarButton(props) {
  const { className, handleClick, icon, text } = props;
  return (
      <button className={className} onClick={handleClick}>
        <div>
          {icon}
          <span>{text}</span>
        </div>
      </button>
    );
}

TopNavbarButton.propTypes = {
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
} 