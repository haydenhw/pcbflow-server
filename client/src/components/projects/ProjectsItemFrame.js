import React from 'react';
import './projects-styles/ProjectsItemFrame.css'
import './projects-styles/floatGrid.css';

export default function ProjectsItemFrame(props) {
  return (
    <div className="col3">
      <div className="container">
          <div className="image-container">
            <img className="project-thumbnail" src="https://getuikit.com/v2/docs/images/placeholder_200x100.svg" alt="" />
          </div>
        <div className="title">
          {props.children}
        </div>
      </div>
    </div>
    
  )
} 