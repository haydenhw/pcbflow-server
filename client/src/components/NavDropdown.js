import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

import Dropdown from 'components/dropdown/Dropdown'
import DropdownTrigger from 'components/dropdown/DropdownTrigger';
import DropdownContent from 'components/dropdown/DropdownContent';

import './styles/NavDropdown.css';

export default class NavDropdown extends Component {
  constructor(){
    super();
    
    this.state = {
      isActive: false
    }
    
    this.toggleIsActive = this.toggleIsActive.bind(this);
  }
  
  routeToHome() {
    console.log('routing')
    hashHistory.push('/');
  }
  
  toggleIsActive () {
    const { isActive } = this.state;
    console.log('switching')
    this.setState({ isActive: !isActive })
  }
  
  render () {
    const { isActive } = this.state;
    const { className } = this.props;
    
    return (
      <Dropdown className={className}>
        <div className='dropdown-wrapper'>
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <FontAwesome name="fa-bars" className="fa-bars"/>
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            <li className='dropdown-item' onClick={this.routeToHome}>
              <a href="#">Home</a>
            </li>
            <li onClick={() => alert('Sorry the log in feature is still under construction!')} className='dropdown-item'>
              <a href="#">Sign Out</a>
            </li>
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

