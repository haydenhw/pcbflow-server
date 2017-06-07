import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import './projects-styles/ProjectsAddButton.css';

export default class ProjectsAddButton extends Component {
  handleClick() {
    const newProject = {
      name: 'Untitled',
      boardSpecs: {
        x: 250,
        y: 100,
        height: 300,
        width: 500,
        thumbnail: '{"attrs":{"width":520,"height":320},"className":"Stage","children":[{"attrs":{"name":"boardLayer"},"className":"Layer","children":[{"attrs":{"name":"boardGroup","x":10,"y":10,"width":500,"height":300,"draggable":"true"},"className":"Group","children":[{"attrs":{"name":"board","width":500,"height":300,"fill":"#e3e3e5","opacity":"0.5","stroke":"#ccc"},"className":"Rect"},{"attrs":{"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"topRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomLeft","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{"x":500,"y":300,"stroke":"#666","fill":"#ddd","strokeWidth":"2","radius":"8","name":"bottomRight","draggable":"true","dragOnTop":"false"},"className":"Circle"},{"attrs":{},"className":"Group","children":[]}]}]}]}',
      },
      modules: [],
    };

    store.dispatch(actions.postNewProject(newProject));
  }

  render() {
    return (
      <div className="project-add-button button" onClick={this.handleClick} role="button">
        <FontAwesome name="fa-plus" className="fa-plus"/>
        <span className="project-add-button-text">Project</span>
      </div>
    );
  }
}
