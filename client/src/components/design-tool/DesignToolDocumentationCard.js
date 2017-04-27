import React from 'react';

export default function DesignToolDocumentationCard(props) {
  return ( 
  <div className= "documentation-card" > 
      <h1 className="heading">Module Actions</h1>
      <h2 className="sub-heading">Delete</h2>
      <ul className="list">
        <li className="item">hover over module + delete key</li>
        <div className="or">OR</div>
        <li className="item">Right click module -> delete</li>
      </ul>
      <h2 className="sub-heading">Rotate</h2>
      <ul className="list">
        <li className="item">Double click module</li>
        <div className="or">OR</div>
        <li className="item">Right clck module -> rotate</li>
      </ul>
  </div>
  )
}  