import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import shortid from 'shortid';

import { getJWT } from 'helpers/users';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/_floatGrid.scss';
import './projects-styles/_ProjectsItemFrame.scss';

class ProjectsList extends Component {
  constructor() {
    super();
    this.state = {
      hasFetched: false,
      projects: [],
    }
  }

  static defaultProps = {
    projects: [],
  }


  componentDidMount() {
    const jwt = getJWT();
    store.dispatch(actions.fetchProjects(jwt))
      .then((projects) => {
        this.setState({ projects });
      });
  }

  componentDidUpdate(prevProps) {
    const { projects } = this.props;
    console.log(projects);
    if (projects !== prevProps.projects) {
      console.log('inner');
      this.setState({ projects });
    }
  }

  confirmDelete = (projectId, projectName) => () => {
    store.dispatch(actions.confirmProjectDelete({
      projectId,
      projectName,
    }));
  }

  render() {
    const { projects } = this.state;

    const projectsList = [...projects].map((project) => {
      const { thumbnail } = project.boardSpecs;
      return (
        <ProjectsItemFrame
          key={shortid.generate()}
          projects={projects}
          projectName={project.name}
          projectId={project._id}
          thumbnail={thumbnail}
          confirmDelete={this.confirmDelete(project._id, project.name)}
        />
      );
    });

    if (projects.length === 0){
      return null;
    }

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

const mapStateToProps = (state) => ({
  projects: state.projects.items,
});

export default connect(mapStateToProps)(ProjectsList);
ProjectsList.propTypes = {
  projects: PropTypes.array,
};
