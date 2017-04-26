import React from 'react';
import './landing-page-styles/LandingPage.css'

export default function LandingPage(props) {
  return (
    <div>
      <div className="landing-navbar">
        <img className="white-logo-image" src="images/white-logo.png" alt=""/>
        <span  className="landing-logo-text" >PCB Design</span>
      </div>
        <div className="landing-page-body">
          <img className="landing-page-background-image" src="./images/landing-background.jpg" alt="landing page background"/>    
          <div className="text">
            <div>This is some text</div>
            <div>This is some more text</div>
          </div>
        </div>
    </div>
  );
}