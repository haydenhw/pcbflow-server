import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';

import DesignTool from 'components/design-tool/DesignTool';
import Projects from 'components/projects/Projects';
import LandingPage from 'components/landing-page/LandingPage';

import './index.css';
import './reset.css';


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={LandingPage} />
      <Route path="/projects" component={Projects} />
      <Route path="/design/:projectId" component={DesignTool} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
