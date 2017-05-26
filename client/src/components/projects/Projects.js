import React from 'react';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import TopNavbar from 'components/top-navbar/TopNavbar';
import ProjectsList from './ProjectsList';
import ProjectsAddButton from './ProjectsAddButton';

import 'components/top-navbar/top-navbar-styles/TopNavbar.css';
import './projects-styles/floatGrid.css';
import './projects-styles/Projects.css';

export default function Projects() {
  return (
    <div>
      <div className="navWide project-navbar">
        <img className="logo-image" src="images/logo4.png" alt="" />
        <span className="logo-text" >PCB<span className="bold">flow</span></span>
      </div>
      <div className="button-bar">
        <div className="row-project">
          <div className="col-wrapper">
            <div>
              <ProjectsAddButton />
            </div>
          </div>
        </div>

      </div>
      <ProjectsList />
    </div>
  );
}

