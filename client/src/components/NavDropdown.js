import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown'
import DropdownTrigger from './DropdownTrigger'
import DropdownContent from './DropdownContent'
import './styles/NavDropdown.css'

export default function NavDropdown() {
  return (
    <div className="nav-dropdown">
      <Dropdown>
        <DropdownTrigger>
          <button>Show Menu</button>
        </DropdownTrigger>
        <DropdownContent isActive={true}>
          <ul>
            <li>Home</li>
            <li>Login</li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

