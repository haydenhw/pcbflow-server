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
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
}

