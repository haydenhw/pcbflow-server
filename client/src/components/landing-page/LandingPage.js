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
        <div className="computer-wrapper">
          <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt="" />
          <img className="computer-image" src="images/computer.png" alt="computer image" />
          <img src="images/dots.svg" alt=""/>
          <img className="circuit-board-image" src="https://easyeda.com/assets/static/images/v4/Sample-Projects-developed-on-EasyEDA-2.jpg" alt="circuit board"/>
        </div>
        <section className="row">
          <div className="landing-page-card-wrapper">
            <div className="col4">
              <LandingPageCard 
                className="landing-page-card "
                icon="https://easyeda.com/assets/static/images/v4/tb3.png"
                title="Easy to Use Interface"
                content="Lorem ipsum ispusm lorem"
              />
            </div>
            <div className="col4">
              <LandingPageCard 
                className="landing-page-card "
                icon="https://easyeda.com/assets/static/images/v4/tb3.png"
                title="Easy to Use Interface"
                content="Lorem ipsum ispusm lorem"
              />
            </div>
            <div className="col4">
              <LandingPageCard 
                className="landing-page-card "
                icon="https://easyeda.com/assets/static/images/v4/tb3.png"
                title="Easy to Use Interface"
                content="Lorem ipsum ispusm lorem"
              />
            </div>
          
          </div>
        </section>
      </section>
    </div>
  );
}
