import React from 'react';

import './side-bar-styles/SideBarDependencyMessage.css';

export default function SideBarDependencyMessage(props) {
  return (
    <div className="dependency-message">
      <p>Showing dependencies for module</p>
      <h2>{props.moduleName}</h2> 
      <p className="show-all" onClick={props.showAll}>Show all modules</p>
    </div>
  )
}