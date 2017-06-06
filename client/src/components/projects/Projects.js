import React from 'react';
import Link from 'react-router';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import NavDropdown from 'components/NavDropdown';
import ProjectsList from './ProjectsList';
import ProjectsAddButton from './ProjectsAddButton';
import TopNavbar from 'components/top-navbar/TopNavbar';
 
// import './projects-styles/floatGrid.css';
// import './projects-styles/Projects.css';
import 'components/styles/NavDropdown.css'

export default function Projects(props) {
  return (
    <div>
      <nav>
        <NavDropdown />
       {/* <div className="dropdown">
          <ul id="nav">
            <li><a href="#">DROPDOWN</a>
                <ul>
                    <li><a href="#">dropdown 1</a></li>
                    <li><a href="#">dropdown 2</a></li>
                    <li><a href="#">dropdown 3</a></li>
                </ul>
            </li>
        </ul>
       </div> */}
    </nav>
    </div>
  );
}

