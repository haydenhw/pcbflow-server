import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

class BoardDimensionInput extends React.Component {

  handleWidthChange(event) {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
     } 
     = this.props;
    
    const boardDimensions = {
      width: Number(event.target.value),
      height: this.props.boardHeight
     } 
     
     const anchorPositions = {
       topLeft: { x: topLeft.x, y: topLeft.y },
       topRight: { x: topLeft.x + boardDimensions.width, y: topRight.y  },
       bottomLeft: { x: bottomLeft.x, y: topLeft.y + boardDimensions.height },
       bottomRight: { x: bottomLeft.x + boardDimensions.width, y: topRight.y + boardDimensions.height }
     }
     
    store.dispatch(actions.updateBoardDimensions(boardDimensions));
    store.dispatch(actions.updateAnchorPositions(anchorPositions));
    
  }
  
  handleHeightChange(event) {
    const {
      width,
      height,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
     } 
     = this.props;
    
    const boardDimensions = {
      width: this.props.boardWidth,
      height: Number(event.target.value)
     }
     
     const anchorPositions = {
       topLeft: { x: topLeft.x, y: topLeft.y },
       topRight: { x: topLeft.x + boardDimensions.width, y: topRight.y  },
       bottomLeft: { x: bottomLeft.x, y: topLeft.y + boardDimensions.height },
       bottomRight: { x: bottomLeft.x + boardDimensions.width, y: topRight.y + boardDimensions.height }
     }
     
    store.dispatch(actions.updateBoardDimensions(boardDimensions));
    store.dispatch(actions.updateAnchorPositions(anchorPositions));
  }

  render() {
    return (
      <form>
        <label>
          Width:
          <input 
            type="text" 
            value={ Math.abs(this.props.boardWidth) } 
            onChange={ this.handleWidthChange.bind(this) } 
          />
        </label>
        <label>
          Height:
          <input 
            type="text" 
            value={ Math.abs(this.props.boardHeight) } 
            onChange={ this.handleHeightChange.bind(this) } 
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => ({
  boardWidth: state.boardSpecs.width,
  boardHeight: state.boardSpecs.height,
  topLeft: state.anchorPositions.topLeft,
  topRight: state.anchorPositions.topRight,
  bottomLeft: state.anchorPositions.bottomLeft,
  bottomRight: state.anchorPositions.bottomRight
});

export default connect(mapStateToProps)(BoardDimensionInput);
