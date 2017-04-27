import React from 'react';
import { hashHistory } from 'react-router';
import './landing-page-styles/LandingPage.css'

export default function LandingPage(props) {
  const imgUrl ='images/landing-background.jpg'
  const backgroundStyle = {
    backgroundImage: 
      `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
      url(${imgUrl})`
  }
  
  return (
    <div>
      <div className="landing-navbar">
        <img className="white-logo-image" src="images/white-logo.png" alt=""/>
        <span  className="landing-logo-text" >PCB Design</span>
      </div>
        <section style={backgroundStyle} className="landing-page-content">
          <div className="landing-page-text">
            <div>Design production ready Printed Circuit Boards in record time</div>
            <div 
              className="landing-page-button" 
              onClick={() => hashHistory.push('/projects')}
              >
                Get Started
            </div>
          </div>
        </section>
        <section className="landing-page-screenshot">
          <div className="computer-wrapper">
              <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt=""/>
              <img className="computer-image" src="images/computer.png" alt="computer image"/>
          </div>
        </section>
    </div>
  );
}
