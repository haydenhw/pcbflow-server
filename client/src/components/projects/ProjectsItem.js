import React from 'react';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

export default function ProjectItem(props) {
  return (
    <div className="title" >
      {props.projectName}
    </div>
  );
}

ProjectItem.propTypes = {
  projectName: PropTypes.string.isRequired
};

