import React, { Component } from 'react';
import { Router, Link, hashHistory } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

export default class ProjectsSubmitForm extends Component {
  handleSubmit(event) {
    const newProject = {
      "name": "Untitled",
      "boardSpecs": {
        "x": 50,
        "y": 50,
        "height": 300,
        "width": 500
      },
      "modules":  []
  }
    
  store.dispatch(actions.postNewProject(newProject));  
  }
  
  render() {
    const labelStyle ={
      "fontSize": "20px"
    }
    
    const inputStyle ={
      "marginLeft": "10px"
    }
    
    const formStyle ={
      "paddingTop": "50px"
    }
    
    return (
      <form style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
        <label style={labelStyle}>
          Create New Project: 
          <input style={inputStyle} type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};
