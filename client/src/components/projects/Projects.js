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
        <div className="navWide project-navbar">
          <img className="logo-image" src="images/logo4.png" alt=""/>
          <span  className="logo-text" >PCB Design</span>
        </div>
        <div className="button-bar">
          <div className="button-wrapper">
            <ProjectsAddButton />
          </div>  
        </div>
          <ProjectsList />
      </div>
    );
};

