import React from 'react';

import './landing-page-styles/LandingPageCard.css';

export default function LandingPageCard(props) {
  return (
    <div className={props.className}>
      <div className="card-icon-frame">
        <img src={props.icon} alt="info card icon"/>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

