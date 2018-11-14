import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import shortid from 'shortid';

import * as actions from 'actions/indexActions';
import store from 'store/store';
import { getProjects } from '../../selectors/projectSelectors';
import { getModules } from '../../selectors/moduleSelectors';

import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/_floatGrid.scss';
import './projects-styles/_ProjectsItemFrame.scss';

class ProjectsList extends Component {
  static defaultProps = {
    projects: [],
  }

  confirmDelete = (project) => () => {
    store.dispatch(actions.confirmProjectDelete(project));
  }

  render() {
    const { projects, modules } = this.props;

    const projectsList = projects.map((project) => {
      const projectModules = modules.filter((module) => (
        module.project === project.id
      ));

      return (
        <ProjectsItemFrame
          key={shortid.generate()}
          modules={projectModules}
          project={project}
          projectName={project.name}
          projectId={project._id}
          confirmDelete={this.confirmDelete(project)}
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
  projects: getProjects(state),
  modules: getModules(state),
});

export default connect(mapStateToProps)(ProjectsList);

ProjectsList.propTypes = {
  projects: PropTypes.array,
};
