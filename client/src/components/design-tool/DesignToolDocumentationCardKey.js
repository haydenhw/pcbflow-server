import React from 'react';

import './design-tool-styles/DesignToolDocumentationCardKey.css';

export default function DesignToolDocumentationCardKey(props) {
  return (
    <div className="key-wrapper">
      <span className="key-text">{props.text}</span>
    </div>)
}
