// refactor to pull out update anchor logic from component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';
import { minWidth, minHeight } from '../../constants/boardConstants';
import { anchorStyles } from '../../constants/styleConstants';

import * as actions from 'actions/indexActions';
import store from 'store/store';


export default class Anchor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeWidth: 2,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.moveToTop = this.moveToTop.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.anchor = this.refs.anchor;
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateAnchorTrigger !== prevProps.updateAnchorTrigger) {
      const { x, y } = this.props;
      this.anchor.setX(x);
      this.anchor.setY(y);
    }
  }

  draggableOn() {
    const group = this.refs.anchor.getParent();
    group.setDraggable(true);
  }

  moveToTop() {
    const group = this.refs.anchor.getParent();
    const layer = group.getLayer();

    group.setDraggable(false);
    this.refs.anchor.moveToTop();
  }

  updatePosition(callback) {
    const activeAnchor = this.refs.anchor;
    const group = this.refs.anchor.getParent();
    const board = group.get('.board')[0];
    const topLeft = group.get('.topLeft')[0];
    const topRight = group.get('.topRight')[0];
    const bottomRight = group.get('.bottomRight')[0];
    const bottomLeft = group.get('.bottomLeft')[0];

    const anchorX = activeAnchor.getX();
    const anchorY = activeAnchor.getY();
    const topLeftX = topLeft.getX();
    const topLeftY = topLeft.getY();
    const topRightX = topRight.getX();
    const topRightY = topRight.getY();
    const bottomLeftX = bottomLeft.getX();
    const bottomLeftY  = bottomLeft.getY ();
    const bottomRightY = bottomRight.getY();
    const bottomRightX = bottomRight.getX();

    switch (activeAnchor.getName()) {
      case 'topLeft':
        if (
          anchorY >= bottomLeftY - minHeight
          && anchorX >= topRightX - minWidth
        ) {
          activeAnchor.setX(topRightX - minWidth);
          activeAnchor.setY(bottomLeftY - minHeight);
          topRight.setY(bottomRightY - minHeight);
          bottomLeft.setX(bottomRightX - minWidth);
        } else if (anchorY >= bottomLeftY - minHeight) {
          activeAnchor.setY(bottomLeftY - minHeight);
          topRight.setY(bottomRightY - minHeight);
          bottomLeft.setX(anchorX);
        } else if (anchorX >= topRightX - minWidth) {
          activeAnchor.setX(topRightX - minWidth);
          topRight.setY(anchorY);
          bottomLeft.setX(bottomRightX - minWidth);
        } else {
          topRight.setY(anchorY);
          bottomLeft.setX(anchorX);
        }
        break;
      case 'topRight':
        if (
          anchorY >= bottomRightY - minHeight
          && anchorX <= topLeftX + minWidth
        ) {
          activeAnchor.setX(topLeftX + minWidth);
          activeAnchor.setY(bottomRightY - minHeight);
          topLeft.setY(bottomLeftY - minHeight);
          bottomRight.setX(bottomLeftX + minWidth);
        } else if (anchorY >= bottomRightY - minHeight) {
          activeAnchor.setY(bottomRightY - minHeight);
          topLeft.setY(bottomLeftY - minHeight);
          bottomRight.setX(anchorX);
        } else if (anchorX < topLeftX + minWidth) {
          activeAnchor.setX(topLeftX + minWidth);
          topLeft.setY(anchorY);
          bottomRight.setX(bottomLeftX + minWidth);
        } else {
          topLeft.setY(anchorY);
          bottomRight.setX(anchorX);
        }
        break;
      case 'bottomRight':
        if (anchorY <= topRightY + minHeight
          && anchorX <= bottomLeftX + minWidth
        ) {
          activeAnchor.setX(bottomLeftX + minWidth);
          activeAnchor.setY(topRightY + minHeight);
          bottomLeft.setY(topLeftY + minHeight);
          topRight.setX(topLeftX + minWidth);
        }else  if (anchorY <= topRightY + minHeight) {
          activeAnchor.setY(topRightY + minHeight);
          bottomLeft.setY(topLeftY + minHeight);
          topRight.setX(anchorX);
        } else if (anchorX <= bottomLeftX + minWidth) {
          activeAnchor.setX(bottomLeftX + minWidth);
          topRight.setX(topLeftX + minWidth);
          bottomLeft.setY(anchorY);
        } else {
          bottomLeft.setY(anchorY);
          topRight.setX(anchorX);
        }
        break;
      case 'bottomLeft':
        if (
          anchorY <= topLeftY + minHeight
          && anchorX >= bottomRightX - minWidth
        ) {
          activeAnchor.setX(bottomRightX - minWidth);
          activeAnchor.setY(topLeftY + minHeight);
          topLeft.setX(topRightX - minWidth);
          bottomRight.setY(topRightY + minHeight);
        } else if (anchorY <= topLeftY + minHeight) {
          activeAnchor.setY(topLeftY + minHeight);
          bottomRight.setY(topRightY + minHeight);
          topLeft.setX(anchorX);
        } else if (anchorX >= bottomRightX - minWidth) {
          activeAnchor.setX(bottomRightX - minWidth);
          topLeft.setX(topRightX - minWidth);
          bottomRight.setY(anchorY);
        } else {
          bottomRight.setY(anchorY);
          topLeft.setX(anchorX);
        }
      break;
    }

    if (callback) {
      const anchors = {
        topLeft: { x: topLeft.getX(), y: topLeft.getY() },
        topRight: { x: topRight.getX(), y: topRight.getY() },
        bottomLeft: { x: bottomLeft.getX(), y: bottomLeft.getY() },
        bottomRight: { x: bottomRight.getX(), y: bottomRight.getY() },
      };

      callback(anchors);
    }


    const width = topRight.getX() - topLeft.getX();
    const height = bottomLeft.getY() - topLeft.getY();

    board.position(topLeft.position());

    if (width && height) {
      store.dispatch(actions.updateBoard({ width, height }));
    }
  }

  handleMouseOver() {
    document.body.style.cursor = 'pointer';
    this.setState({
      strokeWidth: 4,
    });
  }

  handleDragStart() {
    this.props.hideFloatingElements();
  }

  handleDragMove() {

    this.updatePosition();
  }

  handleDragEnd() {
    this.props.unhideFloatingElements();
    this.draggableOn();
    this.updatePosition(anchors => store.dispatch(actions.updateAnchorPositions(anchors)));
  }

  handleMouseOut() {
    document.body.style.cursor = 'default';
    this.setState({
      strokeWidth: 2,
    });
  }

  render() {
    const { x, y, name } = this.props;

    return (
      <Circle
        ref="anchor"
        x={this.anchor ? this.anchor.getX() : x}
        y={this.anchor ? this.anchor.getY() : y}
        strokeWidth={this.state.strokeWidth}
        name={name}
        draggable="true"
        dragOnTop="false"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseDown={this.moveToTop}
        onDragStart={this.handleDragStart}
        onDragMove={this.handleDragMove}
        onDragEnd={this.handleDragEnd}
        {...anchorStyles}
      />);
  }
}

Anchor.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  name: PropTypes.string.isRequired,
  hideFloatingElements: PropTypes.func.isRequired,
  unhideFloatingElements: PropTypes.func.isRequired,
};
