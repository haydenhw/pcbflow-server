import React from 'react';

import './landing-page-styles/LandingPageCard.css';

export default function LandingPageCard(props) {
  return (
    <div className={props.className}>
      <div>{props.icon}</div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

