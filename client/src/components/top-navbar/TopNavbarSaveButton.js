import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { projectsUrl } from 'config/endpointUrls';
import './top-navbar-styles/TopNavbarSaveButton.css'

export class SaveButton extends Component {
  saveProject() {
    const {
      width,
      height,
      x,
      y,
      thumbnail,
      topLeftAnchorX,
      topLeftAnchorY,
      modules,
      projectName,
      id
    } = this.props;
    
    const updatedModules = modules.map(module => {
      const x = module.x - topLeftAnchorX;
      const y = module.y - topLeftAnchorY;
      return Object.assign({}, module, {x, y});
    })
    
    const updatedProject = {
      projectName,
      "boardSpecs": {
        width,
        height,
        thumbnail,
        x: x + topLeftAnchorX,
        y: y + topLeftAnchorY
      },
      "modules": updatedModules
    }
    
    const url = `${projectsUrl}/${id}`;
    fetch(url, {
      method: 'put',
      body: JSON.stringify(updatedProject),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .catch(err => {
      console.error(err)
    })
    
  }
  
  handleClick() {
    this.props.updateLastSaved();
    this.props.updateThumbnail();
    this.saveProject();
    this.props.recordSavedChanges();
  }

  render() {
    const style = {
      "marginBottom": "13px"
    }
    return (
      <button className="save-button" style={style} onClick={this.handleClick.bind(this)}>
        <FontAwesome name="fa-cloud" className="fa-cloud" />
        <span>Save</span>
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  thumbnail: state.boardSpecs.thumbnail,
  topLeftAnchorX: state.anchorPositions.topLeft.x,
  topLeftAnchorY: state.anchorPositions.topLeft.y,
  modules: state.currentProjectModules,
  projectName: state.currentProjectInfo.name,
  id: state.currentProjectInfo.id
});

export default connect(mapStateToProps)(SaveButton);