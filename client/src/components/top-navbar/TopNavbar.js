import React from 'react';

import TopNavbarEditableText from './TopNavbarEditableText';
import './top-navbar-styles/TopNavbar.css'
import TopNavbarSaveButton from './TopNavbarSaveButton';

const titleStyle = {
  color: "white",
  fontSize: "20px"
}

export default function TopNavbar(props) {
  return (
    <div className="navWide">
      <div className="iconWrapper">Icon</div>
      <TopNavbarSaveButton />
      <TopNavbarEditableText 
        text={props.projectName} 
        handleNameChange={props.handleNameChange}
      />
    </div>
  )
}