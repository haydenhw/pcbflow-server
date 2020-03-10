import React from 'react';
import PropTypes from 'prop-types';

import './footer-styles/_Footer.scss';

import { compose } from 'helpers/functional';

const getProjectPrice = modules => (
  modules && modules.length > 0
    ? modules
      .map((module) => module.price)
      .reduce((a, b) => a + b)
    : 0
);

const getPriceString = int => `$${int.toFixed(2).toString()}`;
const getProjectPriceString = compose(getPriceString, getProjectPrice);
export default function Footer(props) {
  const timeLastSaved = (
    <div className="time-last-saved footer-wrapper">
      <span>Last saved: </span>
      <span>{props.timeLastSaved}</span>
    </div>
  );

  return (
    <div className="footer">
      <div className="project-price footer-wrapper">
        <span>Price/Unit: </span>
        <span>{getProjectPriceString(props.modules)}</span>
      </div>
      {props.timeLastSaved && timeLastSaved}
    </div>
  );
}

Footer.propTypes = {
  moudles: PropTypes.array,
  timeLastSaved: PropTypes.string,
};
