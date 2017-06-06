import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown'
import DropdownTrigger from './DropdownTrigger'
import DropdownContent from './DropdownContent'
import './styles/NavDropdown.css'

export default function NavDropdown() {
  return (
  <Dropdown>
    <div classname="dropdown-wrapper">
      <DropdownTrigger>
          <a className="trigger">DROPDOWN</a>
      </DropdownTrigger>
    <DropdownContent isActive={true}>
      <ul className='dropdown-content'>
        <li className='dropdown-item'><a href="#">dropdown 1</a></li>
        <li className='dropdown-item'><a href="#">dropdown 2</a></li>
        <li className='dropdown-item'><a href="#">dropdown 3</a></li>
      </ul>
    </DropdownContent>
    </div>
  </Dropdown>
)
}

