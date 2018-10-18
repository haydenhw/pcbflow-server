import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import { createTempContainer } from 'helpers/generateThumbnail';
import { getProjectDataUrl } from 'helpers/thumbnailHelpers';

import DeleteButton from './ProjectsDeleteButton';
import { defaultThumbnail } from '../../constants/thumbnailConstants';
import { moduleData } from 'config/moduleData';

import './projects-styles/_ProjectsItemFrame.scss';
import './projects-styles/_floatGrid.scss';

function fectchProject(projectId) {
  store.dispatch(actions.fetchProjectById(projectId));
}

export default class ProjectsItemFrame extends Component {
  constructor() {
    super();
    this.state = {
      thumbnailDataUrl: null,
    }
  }

  componentDidMount() {
    const { project, modules } = this.props;

    getProjectDataUrl(project, modules, moduleData).then((dataUrl) => {
      this.setState({ thumbnailDataUrl: dataUrl });
    });
  }

  render() {
    return (
      <div className="col3-project">
        <div className="project-card">
          <div
            className="thumbnail-image"
            style={{ backgroundImage: `url(${this.state.thumbnailDataUrl || ''})`}}
            onClick={() => fectchProject(this.props.projectId)}
            role="buttonplaylistUrl"
          >
          </div>
          <div className="title-bar">
            <div className="title">
              {this.props.projectName}
            </div>
            <DeleteButton handleClick={this.props.confirmDelete} />
          </div>
        </div>
      </div>
    );
  }
}

ProjectsItemFrame.propTypes = {
  projectId: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

ProjectsItemFrame.defaultProps = {
  thumbnail: defaultThumbnail,
}
