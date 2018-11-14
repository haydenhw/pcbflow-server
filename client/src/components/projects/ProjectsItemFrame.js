import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import { getProjectDataUrl } from 'helpers/thumbnailHelpers';
import { defaultThumbnail } from '../../constants/thumbnailConstants';
import { moduleDataList } from 'config/moduleDataList';

import DeleteButton from './ProjectsDeleteButton';

import './projects-styles/_ProjectsItemFrame.scss';
import './projects-styles/_floatGrid.scss';

export default class ProjectsItemFrame extends Component {
  constructor() {
    super();
    this.state = {
      thumbnailDataUrl: null,
    }
  }

  componentDidMount() {
    const { project, modules } = this.props;

    getProjectDataUrl(project, modules, moduleDataList)
      .then((dataUrl) => {
        this.setState({ thumbnailDataUrl: dataUrl });
      });
  }

  handleClick = () => {
    const { projectId } = this.props;

    store.dispatch(actions.fetchProjectById(projectId));
  }

  render() {
    return (
      <div className="col3-project">
        <div className="project-card">
          <div
            className="thumbnail-image"
            style={{ backgroundImage: `url(${this.state.thumbnailDataUrl || ''})`}}
            onClick={this.handleClick}
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
