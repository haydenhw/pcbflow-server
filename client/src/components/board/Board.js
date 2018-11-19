// refactor is that there is no internal state
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'store/store';
import { getActiveProjectBoard } from '../../selectors/projectSelectors';
import { boardStyles } from '../../constants/styleConstants';

import Modules from 'components/modules/Modules';
import Anchor from './BoardAnchor';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.board = this.refs.board;
  }

  updateLocalStatePosition() {
    const boardGroup = this.refs.boardGroup;

    const x = boardGroup.getX();
    const y = boardGroup.getY();

    this.setState({
      x,
      y,
    }, () => {console.log(this.state)});
  }

  updateGlobalStatePosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();

    store.dispatch(actions.updateBoard({ x, y }));
  }

  handleDragStart() {
    this.props.hideFloatingElements();
  }

  handleDragMove() {
    const boardGroup = this.refs.boardGroup;
    const layer = boardGroup.getLayer();

    layer.draw();
    this.updateLocalStatePosition();
  }

  handleDragEnd() {
    this.updateGlobalStatePosition();
    this.props.unhideFloatingElements();
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      rotate,
      hideFloatingElements,
      unhideFloatingElements,
      updateAnchorTrigger,
      isDraggingToBoard,
    } = this.props;

    return (
      <Layer
        ref="boardLayer"
        name="boardLayer"
      >
        <Group
          ref="boardGroup"
          name="boardGroup"
          x={this.state.x || x}
          y={this.state.y || y}
          width={width}
          height={height}
          draggable="true"
          onDragStart={this.handleDragStart}
          onDragMove={this.handleDragMove}
          onDragEnd={this.handleDragEnd}
        >
          <Rect
            ref="board"
            name={'board'}
            x={this.board ? this.board.getX() : topLeft.x}
            y={this.board ? this.board.getY() : topLeft.y}
            width={width}
            height={height}
            stroke={this.props.stroke}
            {...boardStyles}
          />
          <Anchor
            x={topLeft.x}
            y={topLeft.y}
            name='topLeft'
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={topRight.x || width}
            y={topRight.y}
            name='topRight'
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={bottomLeft.x}
            y={bottomLeft.y || height}
            name='bottomLeft'
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Anchor
            x={bottomRight.x || width}
            y={bottomRight.y || height}
            name='bottomRight'
            hideFloatingElements={hideFloatingElements}
            unhideFloatingElements={unhideFloatingElements}
            updateAnchorTrigger={updateAnchorTrigger}
          />
          <Modules
            rotate={rotate}
            isDraggingToBoard={isDraggingToBoard}
          />
        </Group>
      </Layer>
    );
  }
}

const mapStateToProps = state => {
  const { x, y, width, height } = getActiveProjectBoard(state);

  return {
    x,
    y,
    width,
    height,
    updateAnchorTrigger: state.triggers.updateAnchorTrigger,
    topLeft: state.anchors.topLeft,
    topRight: state.anchors.topRight,
    bottomLeft: state.anchors.bottomLeft,
    bottomRight: state.anchors.bottomRight,
  };
}

export default connect(mapStateToProps)(Board);

Board.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  topLeft: PropTypes.object.isRequired,
  topRight: PropTypes.object.isRequired,
  bottomLeft: PropTypes.object.isRequired,
  bottomRight: PropTypes.object.isRequired,
  hideFloatingElements: PropTypes.func.isRequired,
  isDraggingToBoard: PropTypes.bool.isRequired,
  rotate: PropTypes.func.isRequired,
  stroke: PropTypes.string,
  unhideFloatingElements: PropTypes.func.isRequired,
};
