import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchProjects, handleNewUserVisit } from 'actions/indexActions';
import store from 'reduxFiles/store';

export const getUser = () => localStorage.getItem('user');
export const clearUser = () => localStorage.removeItem('user');
export const getJWT = () => localStorage.getItem('jwt');

// do a check for existing user in highest level component
// is there a user in local storage ?
  // yes -> is the jwt current ?
      // yes -> route to projects page. project page uses user id to fetch projects
      // no -> refresh token and ''
  // no -> create a new user, get jwt, save user and jwt to local storage, and create new project
      // under newly created user  id
const doesUserExist = () => Boolean(getUser());

export default class App extends Component {
  componentDidMount() {
    clearUser();
    if (doesUserExist()) {
      store.dispatch(fetchProjects(getJWT()));
    } else {
      store.dispatch(handleNewUserVisit());
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {

};
