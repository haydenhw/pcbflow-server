import React, { Component } from 'react';
import { connect } from 'react-redux';
import Konva from 'konva';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import confirm from 'helpers/confirm';
import store from 'reduxFiles/store';

import ProjectsItem from './ProjectsItem';
import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/floatGrid.css';
import './projects-styles/ProjectsItemFrame.css';

function convertToUrl(json) {
  if (json) {
    return Konva.Node.create(json).toDataURL();
  }
  
  return null;
}

class ProjectList extends Component {
  static defaultProps = {
    projects: []
  }
  
  static confirmDelete(projectId, projectName) {
    console.log(projectName)
    store.dispatch(actions.confirmProjectDelete({
      projectId,
      projectName
    }));
  }

  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }
  
  renderProjectItem(project) {
    const { isFetching } = this.props;
    
    if (isFetching) {
      return <span key={shortid.generate()}>Loading...</span>
    }
    
    return (
      <ProjectsItem
        projectId={project._id}
        projectName={project.name}
      />
    );
  }

  render() {
    const { projects, isFetching } = this.props;
  
    const projectsList = projects.map((project) => {
      const thumbnailSrc = convertToUrl(project.boardSpecs.thumbnail);
      // const thumbnailSrc = 'images/arrows.png'
      return (
        <ProjectsItemFrame
          key={shortid.generate()}
          thumbnailSrc={thumbnailSrc}
          projectId={project._id}
          projectName={project.name}
          confirmDelete={ProjectList.confirmDelete}
          >
            {this.renderProjectItem(project)}
          </ProjectsItemFrame>
        );
      });
      
      return (
        <div className="thumbnail-row">
          <div className="row-project">
            <div className="col-wrapper card">
              {projectsList}
            </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  projects: state.projects.items,
  isFetching: state.projects.isFetching,
  thumbnail: state.boardSpecs.thumbnail,
});

export default connect(mapStateToProps)(ProjectList);