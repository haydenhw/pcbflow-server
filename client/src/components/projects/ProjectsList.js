import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Konva from 'konva';
import shortid from 'shortid';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import { createTempContainer } from 'helpers/generateThumbnail';

import ProjectsItemFrame from './ProjectsItemFrame';

import './projects-styles/_floatGrid.scss';
import './projects-styles/_ProjectsItemFrame.scss';

function convertToUrl(json) {
  let dataUrl;

  if (json) {
    const tempContainer = createTempContainer();
    dataUrl = Konva.Node.create(json, 'container').toDataURL();
    document.body.removeChild(tempContainer);
  }

  return dataUrl;
}

class ProjectsList extends Component {
  static defaultProps = {
    projects: [],
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
          confirmDelete={this.confirmDelete(project._id, project.name)}
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

const mapStateToProps = state => {
  return { projects: state.projects.items };
};

export default connect(mapStateToProps)(ProjectsList);

ProjectsList.propTypes = {
  projects: PropTypes.array,
};
