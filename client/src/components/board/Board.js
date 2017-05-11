import React, { Component } from 'react';
import { Layer, Rect, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Modules from 'components/modules/Modules';
import ModulesItem from 'components/modules/ModulesItem';
import Anchor from './BoardAnchor';
import generateThumbnail from 'helpers/generateThumbnail';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
    };
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps, this.props)
  }

  updateLocalStatePosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();

    this.setState({
      x,
      y,
    });
    const layer = this.refs.boardGroup.getLayer();
    layer.draw();
  }

  updateReduxPosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();

    store.dispatch(actions.updateBoardPosition({
      x,
      y,
    }));
  }

  handleDragMove() {
    this.updateLocalStatePosition();
    this.props.hideDocumentation();
      // improves performance
    const layer = this.refs.boardGroup.getLayer();
    layer.draw();
  }

  handleDragEnd() {
    this.updateReduxPosition();
    this.props.unhideDocumentation();
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
      hideDocumentation,
      unhideDocumentation,
      isDraggingToBoard
     }
     = this.props;

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
          onDragMove={this.handleDragMove.bind(this)}
          onDragEnd={this.handleDragEnd.bind(this)}
        >

          <Rect
            ref="board"
            name={'board'}
            x={topLeft.x}
            y={topLeft.y}
            width={topRight.x - topLeft.x || width}
            height={bottomLeft.y - topLeft.y || height}
            fill="#e3e3e5"
            opacity="0.5"
            stroke={this.props.stroke || '#ccc'}
          />

          <Anchor
            x={topLeft.x}
            y={topLeft.y}
            name={'topLeft'}
            hideDocumentation={hideDocumentation}
            unhideDocumentation={unhideDocumentation}
          />
          <Anchor
            x={topRight.x || width}
            y={topRight.y}
            name={'topRight'}
            hideDocumentation={hideDocumentation}
            unhideDocumentation={unhideDocumentation}
          />
          <Anchor
            x={bottomLeft.x}
            y={bottomLeft.y || height}
            name={'bottomLeft'}
            hideDocumentation={hideDocumentation}
            unhideDocumentation={unhideDocumentation}
          />
          <Anchor
            x={bottomRight.x || width}
            y={bottomRight.y || height}
            name={'bottomRight'}
            hideDocumentation={hideDocumentation}
            unhideDocumentation={unhideDocumentation}
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

const mapStateToProps = state => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  stroke: state.boardSpecs.stroke,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  topLeft: state.anchorPositions.topLeft,
  topRight: state.anchorPositions.topRight,
  bottomLeft: state.anchorPositions.bottomLeft,
  bottomRight: state.anchorPositions.bottomRight,
});

export default connect(mapStateToProps)(Board);
