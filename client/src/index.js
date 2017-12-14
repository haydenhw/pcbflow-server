import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'reduxFiles/store';

import DesignTool from 'components/design-tool/DesignTool';
import ProjectsContainer from 'components/projects/ProjectsContainer';
import LandingPage from 'components/landing-page/LandingPage';

import './styles/_reset.scss';
import './styles/index.scss';
import './styles/icons/style.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={LandingPage} />
      <Route path="/projects" component={ProjectsContainer} />
      <Route path="/design/:projectId" component={DesignTool} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
