import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import store from 'reduxFiles/store';
import { handleExistingUserVisit, handleNewUserVisit } from 'actions/indexActions';
import {
  clearJWT,
  clearUser,
  doesUserExist,
  getJWT,
  getUser,
  isJWTExpired,
} from 'helpers/users';

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
    const res =  React.Children.count(children);
    const childrenWithProps = React.Children.map(children, child => (
      React.cloneElement(child, {
        testProp: 'heyyyy',
        stageRef: (node) => (this.stageNode = node),
        stageNode: this.stageNode,
      })
    ));

    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

App.propTypes = {
};
