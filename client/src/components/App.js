import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import store from 'store/store';
import { handleExistingUserVisit, handleNewUserVisit } from 'actions/indexActions';
import { isJWTExpired, getUser, getJWT, clearUser, clearJWT  } from 'helpers/users';
// *move this to helpers
const doesUserExist = () => Boolean(getUser());

export default class App extends Component {
  constructor() {
    super();
    this.stageNode = null;
  }
  componentDidMount() {
    const jwt = getJWT();
    const user = getUser();

    doesUserExist()
      ? store.dispatch(handleExistingUserVisit(jwt, user))
      : store.dispatch(handleNewUserVisit());
  }

  componentDidUpdate() {
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
