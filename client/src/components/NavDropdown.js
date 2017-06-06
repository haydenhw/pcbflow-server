import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown'
import DropdownTrigger from './DropdownTrigger';
import DropdownContent from './DropdownContent';
import './styles/NavDropdown.css';

export default class NavDropdown extends Component {
  constructor(){
    super();
    
    this.state = {
      isActive: false
    }
    
    this.toggleIsActive = this.toggleIsActive.bind(this);
  }
  
  toggleIsActive () {
    const { isActive } = this.state;
    console.log('switching')
    this.setState({ isActive: !isActive })
  }
  
  render () {
    const { isActive } = this.state;
    
    return (
      <Dropdown>
        <div className='dropdown-wrapper'>
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <a>DROPDOWN</a>
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            <li className='dropdown-item'><a href="#">dropdown 1</a></li>
            <li className='dropdown-item'><a href="#">dropdown 2</a></li>
            <li className='dropdown-item'><a href="#">dropdown 3</a></li>
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

