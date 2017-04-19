import React, { Component } from 'react';
import { Link, Route } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import DeleteButton from './ProjectsDeleteButton';

const style = { 
  cursor: "pointer",
  width: "125px",
  marginBottom: "5px",
  marginTop: "15px",
  display: "inline-block"
}

function fectchProject(projectId) {
  store.dispatch(actions.fetchProjectById(projectId))
}

export default function ProjectLink(props) {
  return (
  <div style={style} >
    <span onClick={() => fectchProject(props.projectId)} >
    {props.projectName}
    </span>
    <DeleteButton projectId={props.projectId} />
  </div>
  );
}
