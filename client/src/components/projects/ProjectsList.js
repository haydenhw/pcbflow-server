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
  return Konva.Node.create(json).toDataURL();
}

class ProjectList extends Component {
  static confirmDelete(projectId) {
    confirm('Are you sure you want to delete this project?').then(() => {
      store.dispatch(actions.deleteProject(projectId));
    }, () => {});
  }

  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }

  render() {
    const { projects } = this.props;
    if (projects && projects.length > 0) {
      const projectsList = projects.map((project) => {
        const thumbnailSrc = convertToUrl(project.boardSpecs.thumbnail);
        return (
          <ProjectsItemFrame
            key={shortid.generate()}
            thumbnailSrc={thumbnailSrc}
            projectId={project._id}
            confirmDelete={ProjectList.confirmDelete}
          >
            <ProjectsItem
              projectId={project._id}
              projectName={project.name}
            />
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

    return <div />;
  }
}

const mapStateToProps = state => ({
  projects: state.projectList,
  thumbnail: state.boardSpecs.thumbnail,
});

export default connect(mapStateToProps)(ProjectList);
