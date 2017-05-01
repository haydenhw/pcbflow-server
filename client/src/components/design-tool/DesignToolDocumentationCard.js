import React from 'react';
import DesignToolDocumentationCardKey from './DesignToolDocumentationCardKey';

export default function DesignToolDocumentationCard(props) {
  const deleteKey =  <DesignToolDocumentationCardKey text="del" />
  return (
    <div className="documentation-card" >
      <div className="doc-wrapper">
        <div className="sub-doc">
          <h2 className="sub-heading">Delete Module</h2>
          <ul className="list">
            <li className="item">Hover over module + {deleteKey}</li>
            <div className="or">OR</div>
            <li className="item">Right click module 
              <img className="arrow" src="images/arrow.png" alt=""/>
              <div className="menu-item">delete</div>
            </li>
          </ul>
        </div>
        <div className="sub-doc">
          <h2 className="sub-heading">Rotate Module</h2>
          <ul className="list">
            <li className="item">Double click module</li>
            <div className="or">OR</div>
            <li className="item">Right clck module 
              <img className="arrow" src="images/arrow.png" alt=""/>
              <div className="menu-item">rotate</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
