import React from 'react';
import FontAwesome from 'react-fontawesome';

import TopNavbarEditableText from './TopNavbarEditableText';
import TopNavbarSaveButton from './TopNavbarSaveButton';
import './top-navbar-styles/TopNavbar.css';

const titleStyle = {
  color: "white",
  fontSize: "20px"
}

export default function TopNavbar(props) {
  
  const handleFolderIconClick = () => {
    console.log('clicked', props)
    props.updateThumbnail();
    props.routeToProjects();
  }
  
  return (
    <div className="navWide">
      <div className="iconWrapper" onClick={handleFolderIconClick}>
        <FontAwesome className='fa-folder-open'
        name='fa-folder-open'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
      </div>
      <TopNavbarSaveButton 
        updateThumbnail={props.updateThumbnail} 
        updateLastSaved={props.updateLastSaved}
      />
      <TopNavbarEditableText 
        text={props.projectName} 
        handleNameChange={props.handleNameChange}
      />
    </div>
  )
}