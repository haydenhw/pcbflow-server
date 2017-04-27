import React, { Component } from 'react';
import { Circle } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';


class Anchor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeWidth: 2,
    };
  }
  update() {
    const activeAnchor = this.refs.anchor;
    const group = this.refs.anchor.getParent();
    const board = group.get('.board')[0];
    const layer = group.getLayer();
    const topLeft = group.get('.topLeft')[0];
    const topRight = group.get('.topRight')[0];
    const bottomRight = group.get('.bottomRight')[0];
    const bottomLeft = group.get('.bottomLeft')[0];
    const anchorX = activeAnchor.getX();
    const anchorY = activeAnchor.getY();
    // update anchor positions
    switch (activeAnchor.getName()) {
      case 'topLeft':
        topRight.setY(anchorY);
        bottomLeft.setX(anchorX);
        break;
      case 'topRight':
        topLeft.setY(anchorY);
        bottomRight.setX(anchorX);
        break;
      case 'bottomRight':
        bottomLeft.setY(anchorY);
        topRight.setX(anchorX);
        break;
      case 'bottomLeft':
        bottomRight.setY(anchorY);
        topLeft.setX(anchorX);
        break;
    }

    const anchorPositions = {
      topLeft: { x: topLeft.getX(), y: topLeft.getY() },
      topRight: { x: topRight.getX(), y: topRight.getY() },
      bottomLeft: { x: bottomLeft.getX(), y: bottomLeft.getY() },
      bottomRight: { x: bottomRight.getX(), y: bottomRight.getY() },
    };

    store.dispatch(actions.updateAnchorPositions(anchorPositions));
    board.position(topLeft.position());

    const width = topRight.getX() - topLeft.getX();
    const height = bottomLeft.getY() - topLeft.getY();

    if (width && height) {
      const boardDimensions = {
        width,
        height,
      };
      store.dispatch(actions.updateBoardDimensions(boardDimensions));
    }
  }

  moveToTop() {
    const group = this.refs.anchor.getParent();
    const layer = group.getLayer();

    group.setDraggable(false);
    this.refs.anchor.moveToTop();
  }

  draggableOn() {
    const group = this.refs.anchor.getParent();
    const layer = group.getLayer();
    group.setDraggable(true);
  }

  handleMouseOver() {
    document.body.style.cursor = 'pointer';
    this.setState({
      strokeWidth: 4,
    });
  }

  handleMouseOut() {
    document.body.style.cursor = 'default';
    this.setState({
      strokeWidth: 2,
    });
  }

  render() {
    return (<Circle
      ref="anchor"
      x={this.props.x}
      y={this.props.y}
      stroke="#666"
      fill="#ddd"
      strokeWidth={this.state.strokeWidth}
      radius="8"
      name={this.props.name}
      draggable="true"
      dragOnTop="false"
      onMouseOver={this.handleMouseOver.bind(this)}
      onMouseOut={this.handleMouseOut.bind(this)}
      onMouseDown={this.moveToTop.bind(this)}
      onDragMove={this.update.bind(this)}
      onDragEnd={this.draggableOn.bind(this)}
    />);
  }
}

const mapStateToProps = state => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  boardX: state.boardSpecs.x,
  boardY: state.boardSpecs.y,
});

export default connect(mapStateToProps)(Anchor);
