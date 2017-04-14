import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ProjectsList from './ProjectsList';
import ProjectsSubmitForm from './ProjectsSubmitForm'
import TopNavbar from 'components/top-navbar/TopNavbar';
import 'components/top-navbar/top-navbar-styles/TopNavbar.css' 

const titleStyle = {
  color: "white",
  fontSize: "20px", 
  marginLeft: "10px"
}

export default function Projects() {
    return (
      <div>
        <div className="navWide">
          <h1 style={titleStyle}>PCB Design</h1>
        </div>
          <ProjectsSubmitForm />
          <ProjectsList />
      </div>
    );
};

