import React from 'react';
import PropTypes from 'prop-types';

import './design-tool-styles/DesignToolDocumentationCardKey.css';

export default function DesignToolDocumentationCardKey(props) {
  const { text } = props;

  return (
    <div className="key-wrapper">
      <span className="key-text">{text}</span>
    </div>);
}

DesignToolDocumentationCardKey.propTypes = {
  text: PropTypes.string.isRequired,
};
