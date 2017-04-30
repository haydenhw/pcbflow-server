import React from 'react';
import DesignToolDocumentationCardKey from './DesignToolDocumentationCardKey';

export default function DesignToolDocumentationCard(props) {
  const deleteKey =  <DesignToolDocumentationCardKey text="del" />
  return (
    <div className="documentation-card" >
      <h1 className="heading">Module Actions</h1>
      <h2 className="sub-heading">Delete</h2>
      <ul className="list">
        <li className="item">Hover over module + {deleteKey}</li>
        <div className="or">OR</div>
        <li className="item">Right click module 
          <img className="arrow" src="images/arrow.png" alt=""/>
          <div className="menu-item">delete</div>
          </li>
      </ul>
      <h2 className="sub-heading">Rotate</h2>
      <ul className="list">
        <li className="item">Double click module</li>
        <div className="or">OR</div>
        <li className="item">Right clck module 
          <img className="arrow" src="images/arrow.png" alt=""/>
          <div className="menu-item">rotate</div>
        </li>
        </ul>
    </div>
  );
}
