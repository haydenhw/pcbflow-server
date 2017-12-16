import React from 'react';
import PropTypes from 'prop-types';

import './logo2-styles/Logo2.scss';

export default function logo2() {
  return (
    <div className="logo2-link" onClick={() => console.log('hola')}>
      <img className="logo2-image" src="images/logo4.png" alt="" />
      <span className="logo2-text">PCB</span>
      <span className="bold">flow</span>
    </div>
  );
}
