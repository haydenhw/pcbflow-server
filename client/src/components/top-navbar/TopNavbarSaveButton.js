import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import store from 'reduxFiles/store';
import * as actions from 'actions/indexActions';

import { projectsUrl } from 'config/endpointUrls';
import './top-navbar-styles/TopNavbarSaveButton.css';

export function SaveButton(props) {
  const saveProject = () => {
    const {
      x,
      y,
      width,
      height,
      id,
      modules,
      projectName,
      thumbnail,
      topLeftAnchorX,
      topLeftAnchorY,
    } = props;

    const updatedModules = modules.map((module) => {
      const x = module.x - topLeftAnchorX;
      const y = module.y - topLeftAnchorY;
      return Object.assign({}, module, { x, y });
    });

    const updatedProject = {
      projectName,
      boardSpecs: {
        width,
        height,
        thumbnail,
        x: x + topLeftAnchorX,
        y: y + topLeftAnchorY,
      },
      modules: updatedModules,
    };

    store.dispatch(actions.updateProject(updatedProject, id));
  };

  const handleClick = () => {
    const { updateThumbnail, updateLastSaved, recordSavedChanges } = props;

    const updateThenSave = new Promise((resolve) => {
      updateThumbnail();
      resolve();
    });

    updateThenSave.then(() => {
      saveProject();
    });

    updateLastSaved();
    recordSavedChanges();
  };

  return (
    <button className="save-button" onClick={handleClick}>
      <div>
        <FontAwesome name="fa-cloud" className="fa-cloud" />
        <span>Save</span>
      </div>
    </button>
  );
}

const mapStateToProps = state => ({
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  id: state.currentProjectInfo.id,
  modules: state.currentProjectModules.present,
  projectName: state.currentProjectInfo.name,
  projects: state.projects.items,
  thumbnail: state.boardSpecs.string,
  topLeftAnchorX: state.anchorPositions.topLeft.x,
  topLeftAnchorY: state.anchorPositions.topLeft.y,
});

export default connect(mapStateToProps)(SaveButton);

SaveButton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string,
  modules: PropTypes.array.isRequired,
  projectName: PropTypes.string,
  projects: PropTypes.array.isRequired,
  recordSavedChanges: PropTypes.func.isRequired,
  thumbnail: PropTypes.object,
  topLeftAnchorX: PropTypes.number,
  topLeftAnchorY: PropTypes.number,
  updateThumbnail: PropTypes.func.isRequired,
};
