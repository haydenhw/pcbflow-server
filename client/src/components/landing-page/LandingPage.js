import React from 'react';
import { hashHistory } from 'react-router';

import LandingPageCard from './LandingPageCard'

import './landing-page-styles/LandingPage.css';
import './landing-page-styles/floatGrid.css';

export default function LandingPage(props) {
  const imgUrl = 'images/landing-background.jpg';
  const backgroundStyle = {
    backgroundImage:
    `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${imgUrl})`,
  };
  
  return (
    <div className="landing-page-body">
      <div className="landing-navbar">
        <img className="white-logo-image" src="images/white-logo.png" alt="" />
        <span className="landing-logo-text" >PCB Design</span>
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
          <section className="design-to-pcb-visual">
            <div className="computer-wrapper">
              <img className="computer-image inline-image" src="images/computer.png" alt="computer image" />
              <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt="" />
            </div>
            <img className="dots inline-image" src="images/dots.svg" alt=""/>
            <img className="circuit-board-image inline-image" src="images/real-pcb.jpg" alt="circuit board"/>
          </section>
          
          <section className="row">
            <div className="landing-page-card-wrapper">
              <div className="col4">
                <LandingPageCard 
                  className="landing-page-card "
                  icon="images/info-card-test-icon.png"
                  title="Easy to Use Interface"
                  content="Complete your desgin in no time with PCBDesign's user friendly drag and drop interface. No engineers required"
                />
              </div>
              <div className="col4">
                <LandingPageCard 
                  className="landing-page-card "
                  icon="images/info-card-test-icon.png"
                  title="Instant Price Estimates"
                  content="Get a price estimate that updates automatically as you add and remove modules so you can keep your project under budget"
                />
              </div>
              <div className="col4">
                <LandingPageCard 
                  className="landing-page-card "
                  icon="images/info-card-test-icon.png"
                  title="From Design to Production"
                  content="You only need to focus on the design. We'll take care of the production logistics for you"
                />
              </div>
              
            </div>
          </section>
        </section>
      </div>
    );
  }
