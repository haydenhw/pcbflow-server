import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';


import DesignTool from 'components/design-tool/DesignTool';
import Projects from 'components/projects/Projects';
import store from 'reduxFiles/store';
import './index.css';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component ={Projects}/> 
      <Route path="/design/:projectId" component={DesignTool}/> 
    </Router>
  </Provider>,
  document.getElementById('root')
);
