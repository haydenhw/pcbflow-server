import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import shortid from 'shortid';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/floatGrid.css';
import './projects-styles/ProjectsItemFrame.css';

function convertToUrl(json) {
  return json ? Konva.Node.create(json).toDataURL() : null;
}

class ProjectsList extends Component {
  static defaultProps = {
    projects: [],
  }

  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }

  confirmDelete = (projectId, projectName) => () => {
    store.dispatch(actions.confirmProjectDelete({
      projectId,
      projectName,
    }));
  }

  render() {
    const { projects } = this.props;

    const projectsList = projects.map((project) => {
      const thumbnailSrc = convertToUrl(project.boardSpecs.thumbnail);
      
      return (
        <ProjectsItemFrame
          key={shortid.generate()}
          projectName={project.name}
          projectId={project._id}
          thumbnailSrc={thumbnailSrc}
          confirmDelete={this.confirmDelete()}
        />
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
  thumbnail: state.boardSpecs.thumbnail,
});

export default connect(mapStateToProps)(ProjectsList);

ProjectsList.propTypes = {
  projects: PropTypes.array,
};

