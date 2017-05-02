import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import LandingPageCard from './LandingPageCard';
// import ExecutionEnvironment from 'react/lib/ExecutionEnvironment'

import './landing-page-styles/LandingPage.css';
import './landing-page-styles/floatGrid.css';

export default class LandingPage extends Component {

  changeButtonPosition(w) {
    console.log('hello');
  }

  componentDidMount() {
    document.body.addEventListener('scroll', () => { console.log(''); });
  }

  render() {
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
            <span>Design production ready Printed Circuit Boards in record time</span>
            <div
              className="landing-page-button"
              onClick={() => hashHistory.push('/projects')}
            >
                Get Started
              </div>
          </div>
        </section>
        <main className="landing-page-main">
          <div className="landing-page-section-heading">
            <h2>This is a heading</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia ac magna id pellentesque. Donec consectetur adipiscing.</p>
          </div>
          <section className="design-to-pcb-visual">
            <div className="computer-wrapper">
              <img className="computer-image inline-image" src="images/computer.png" alt="computer image" />
              <img className="design-tool-screenshot" src="images/design-tool-screenshot.png" alt="app screenshot" />
            </div>
            <img className="dots inline-image" src="images/dots.svg" alt="dots" />
            <img className="less-dots inline-image" src="images/less-dots.svg" alt="dots" />
            <img className="circuit-board-image inline-image" src="images/real-pcb.jpg" alt="circuit board" />
          </section>

          <section className="landing-page-card-section row">
            <div className="landing-page-section-heading">
              <h2>This is a heading</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia ac magna id pellentesque. Donec.</p>
            </div>
            <div className="landing-page-card-wrapper">
              <div className="col4">
                <LandingPageCard
                  className="landing-page-card"
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
        </main>
      </div>
    );
  }
}
