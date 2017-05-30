import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import LandingPageCard from './LandingPageCard';

import './landing-page-styles/LandingPage.css';
import './landing-page-styles/floatGrid.css';

export default function LandingPage() {
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
        <span className="landing-page-logo-text" >PCB<span className="bold">flow</span></span>
      </div>
      <section style={backgroundStyle} className="landing-page-content">
        <div className="landing-page-text">
          <span>Design cutting edge electronics in minutes</span>
        </div>
        <div
          role="button"
          className="landing-page-button"
          onClick={() => hashHistory.push('/projects')}
        >
          Get Started
        </div>
      </section>
      <main className="landing-page-main">
        <div className="landing-page-section-heading">
          <h2>Bring your ideas to life</h2>
          <p>Create your custom design with PCBflow. Submit for review by our team of expert engineers. We'll manufacture and ship your device, tested and fully functional, with 15 days.</p>
        </div>
        <section className="design-to-pcb-visual">
          <div className="computer-wrapper">
            <img className="computer-image inline-image" src="images/computer.png" alt="computer" />
            <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt="app screenshot" />
          </div>
          <img className="dots inline-image" src="images/dots.svg" alt="dots" />
          <img className="less-dots inline-image" src="images/less-dots.svg" alt="dots" />
          <img className="arrows inline-image" src="images/arrows.svg" alt="arrow"/>
          <img className="circuit-board-image inline-image" src="images/real-pcb.jpg" alt="circuit board" />
        </section>
        
        <section className="landing-page-card-section row">
          <div className="landing-page-section-heading">
            <h2>Design with ease</h2>
            <p>PCBflow's user friendly drag and drop interface is a breeze to learn and use.</p>
          </div>
          <div className="landing-page-card-wrapper">
            <div className="col4">
              <LandingPageCard
                className="landing-page-card"
                icon="images/info-card-test-icon.png"
                title="No Engineers Required"
                content="PCBflow abstracts away the hard parts of printed circuit board design. You don’t need to worry about routing or connections."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                className="landing-page-card "
                icon="images/info-card-test-icon.png"
                title="Interactive Tutorial"
                content="Our step by step tutorial will teach you how to reason about printed circuit board design while demostrating how to use the tool."
              />
            </div>
            <div className="col4">
              <LandingPageCard
                className="landing-page-card "
                icon="images/info-card-test-icon.png"
                title="Instant Price Estimates"
                content="Get a price estimate that updates automatically as you add and remove modules so you can keep your project under budget."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
  
