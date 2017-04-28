import React from 'react';
import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

import TodoList from './TodoList'
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import './top-navbar-styles/TopNavbarUndoButton.css';

export function TopNavbarUndoButton(props) {
  return (
    <div className="undo-button">
        <TodoList />
        <button onClick={() => store.dispatch(ActionCreators.undo())}>
          Undo
        </button>
      
      <button onClick={() => store.dispatch(actions.addTodo('hola'))}>Change</button>
      
      
    </div>
  
  )
}

const mapStateToProps = state => ({
    hasUnsavedChanges: state.hasUnsavedChanges.bool
});

export default connect(mapStateToProps)(TopNavbarUndoButton);
