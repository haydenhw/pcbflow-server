import React from 'react';

import './top-navbar-styles/TopNavbar.css'
import TopNavbarSaveButton from './TopNavbarSaveButton';

const titleStyle = {
  color: "white",
  fontSize: "20px"
}

export default function TopNavbar(props) {
  return (
    <div className="navWide">
      <div>Icon</div>
      <h1 style={titleStyle}>Project Name</h1>
      <TopNavbarSaveButton />
    </div>
  )
}