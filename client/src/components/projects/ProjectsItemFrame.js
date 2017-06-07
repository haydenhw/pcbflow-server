import React from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import DeleteButton from './ProjectsDeleteButton';

import './projects-styles/ProjectsItemFrame.css';
import './projects-styles/floatGrid.css';

function fectchProject(projectId) {
  store.dispatch(actions.fetchProjectById(projectId));
}

export default function ProjectsItemFrame(props) {
  return (
    <div className="col3-project">
      <div
        className="container"
      >
        <div
          role="button"
          className="image-container"
          onClick={() => fectchProject(props.projectId)}
        >
          <img className="project-thumbnail" src={props.thumbnailSrc} alt="project-thumbnail" />
        </div>
        <div className="title-bar">
          <div className="title">
            {props.children}
          </div>
          <DeleteButton handleClick={props.confirmDelete} />
        </div>
      </div>
    </div>

  );
}

ProjectsItemFrame.propTypes = {
  thumbnailSrc: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};
