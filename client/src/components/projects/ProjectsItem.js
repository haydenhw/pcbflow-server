import React, { Component } from 'react';
import { Link, Route } from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

const style = { 
  cursor: "pointer",
  width: "125px",
  marginBottom: "5px",
  marginTop: "15px",
  display: "inline-block"
}

export default function ProjectLink(props) {
  return (
  <div style={style} >
    <span  >
    {props.projectName}
    </span>
  </div>
  );
}
