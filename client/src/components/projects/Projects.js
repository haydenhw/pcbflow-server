import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ProjectsList from './ProjectsList';
import ProjectsAddButton from './ProjectsAddButton'
import TopNavbar from 'components/top-navbar/TopNavbar';
import 'components/top-navbar/top-navbar-styles/TopNavbar.css' 
import './projects-styles/floatGrid.css' 
import './projects-styles/Projects.css' 



const titleStyle = {
  color: "white",
  fontSize: "20px", 
  marginLeft: "10px"
}


export default function Projects() {
    return (
      <div>
        <div className="navWide">
          <h1  className="logo-text" >PCB Design</h1>
        </div>
        <div className="button-bar">
          <ProjectsAddButton />
        </div>
          <ProjectsList />
      </div>
    );
};

