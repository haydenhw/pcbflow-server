import React from 'react';
import { ActionCreators } from 'redux-undo';

import store from 'reduxFiles/store';
import './top-navbar-styles/TopNavbarUndoButton.css';

export default function TopNavbarUndoButton(props) {
  return (
    <button 
      className="undo-button"
      onClick={() => store.dispatch(ActionCreators.undo())}
    >
      Undo
    </button>
  )
}