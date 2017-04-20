import React, { Component } from 'react';
import { Router, Link, hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import './projects-styles/ProjectsAddButton.css';

export default class ProjectsAddButton extends Component {
  handleClick() {
    const newProject = {
      "name": "Untitled",
      "boardSpecs": {
        "x": 250,
        "y": 100,
        "height": 300,
        "width": 500
      },
      "modules":  []
  }
    
  store.dispatch(actions.postNewProject(newProject));  
  }
  
  render() {
    
  
    
    return (
      <div className="project-add-button" onClick={this.handleClick}>
        <span className="icono-plus"></span>
        <div className="project-add-button-text">Project</div>
      </div>
    );
  }
};
