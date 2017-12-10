import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import NavDropdown from 'components/NavDropdown';
import TopNavbarButton from 'components/top-navbar/TopNavbarButton';
import ProjectsList from './ProjectsList';
import ProjectsAddButton from './ProjectsAddButton';

import 'components/top-navbar/top-navbar-styles/TopNavbar.css';
import './projects-styles/floatGrid.css';
import './projects-styles/Projects.css';

export default function Projects({ handleHomeButtonClick }) {
  return (
    <div>
      <nav>
        <div className="project-nav-top">
          <div className="logo-link" onClick={handleHomeButtonClick}>
            <img className="logo-image" src="images/logo4.png" alt="" />
            <span className="logo-text">PCB<span className="bold">flow</span></span>
          </div>
          <TopNavbarButton
            className="nav-button home-button"
            handleClick={handleHomeButtonClick}
            icon={<span className="icon-home" />}
            text=""
          />
        </div>
        <div className="project-nav-bottom">
          <div className="row-project">
            <div className="col-wrapper">
              <div>
                <ProjectsAddButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ProjectsList />
    </div>
  );
}

Projects.propTypes = {
  handleLinkClick: PropTypes.func,
};
