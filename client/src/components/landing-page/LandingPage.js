import React from 'react';
import { hashHistory } from 'react-router';
import './landing-page-styles/LandingPage.css'

export default function LandingPage(props) {
  const imgUrl ='images/landing-background.jpg'
  const backgroundStyle = {
    backgroundImage: `url(${imgUrl})`
  }
  
  return (
    <div>
      <div className="landing-navbar">
        <img className="white-logo-image" src="images/white-logo.png" alt=""/>
        <span  className="landing-logo-text" >PCB Design</span>
      </div>
        <div style={backgroundStyle} className="landing-page-content">
          <div className="landing-page-text">
            <div>Design Production Ready Printed Circuit Boards</div>
            <div>in Record Time</div>
            <div 
              className="landing-page-button" 
              onClick={() => hashHistory.push('/projects')}
              >
                Get Started
            </div>
          </div>
        </div>
    </div>
  );
}

