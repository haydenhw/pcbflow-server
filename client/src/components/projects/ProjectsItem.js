import React, { Component } from 'react';
import { Link, Route } from 'react-router';
import PropTypes from 'prop-types';


import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

const style = {
  cursor: 'pointer',
  width: '125px',
  marginBottom: '5px',
  marginTop: '15px',
  display: 'inline-block',
};

export default function ProjectLink(props) {
  return (
    <div className="title" >
      {props.projectName}
    </div>
  );
}

ProjectLink.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired
};

