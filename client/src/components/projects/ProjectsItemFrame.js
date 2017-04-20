import React from 'react';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import DeleteButton from './ProjectsDeleteButton';
import './projects-styles/ProjectsItemFrame.css'
import './projects-styles/floatGrid.css';

export default function ProjectsItemFrame(props) {
  return (
    <div className="col3">
      <div className="container">
          <div className="image-container">
            <img className="project-thumbnail" src={props.thumbnailSrc} alt="project-thumbnail" />
          </div>
        <div className="title-bar">
          <div className="title">
            {props.children}
          </div>
            <DeleteButton projectId={props.projectId} />
        </div>
        
      </div>
    </div>
    
  )
} 