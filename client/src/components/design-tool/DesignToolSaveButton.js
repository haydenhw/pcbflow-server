import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import { projectsUrl } from 'config/endpointUrls';
import './design-tool-styles/DesignToolSaveButton.css';

class SaveButton extends Component {
  saveProject() {
    const {
      width,
      height,
      x,
      y,
      topLeftAnchorX,
      topLeftAnchorY,
      modules,
      projectName,
      id,
    } = this.props;

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
        x: x + topLeftAnchorX,
        y: y + topLeftAnchorY,
      },
      modules: updatedModules,
    };

    const url = `${projectsUrl}/${id}`;
    fetch(url, {
      method: 'put',
      body: JSON.stringify(updatedProject),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    const style = {
      marginBottom: '13px',
    };
    return (
      <button className="save-button" style={style} onClick={this.saveProject.bind(this)}>
        Save
      </button>
    );
  }
}

const mapStateToProps = state => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  topLeftAnchorX: state.anchorPositions.topLeft.x,
  topLeftAnchorY: state.anchorPositions.topLeft.y,
  modules: state.currentProjectModules,
  projectName: state.currentProjectInfo.name,
  id: state.currentProjectInfo.id,
});

export default connect(mapStateToProps)(SaveButton);
