import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import store from 'reduxFiles/store';
import { fetchProjects, handleExistingUserVisit, handleNewUserVisit } from 'actions/indexActions';
import { isJWTExpired, getUser, getJWT, clearUser, clearJWT  } from 'helpers/users';

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
    // clearJWT();
    // clearUser();
    // const res = getJWT()
    // console.log(res)
    // if (res) {
    //   console.log(jwtDecode(res));
    // }

    const jwt = getJWT();
    const user = getUser();

    doesUserExist()
      ? store.dispatch(handleExistingUserVisit(jwt, user))
      : store.dispatch(handleNewUserVisit());
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
