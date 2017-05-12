import React, { Component } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import enforceRules from 'helpers/enforceRules';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail from 'helpers/generateThumbnail';

export default class ModulesItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      strokeWidth: 1,
    };
  }

  setImage() {
    if (this.props.imageSrc) {
      const image = new window.Image();
      image.src = this.props.imageSrc;
      image.onload = () =>
      store.dispatch(actions.updateModuleImage({
        index: this.props.index,
        imageNode: image,
      }));
    }
  }

  setDefaultStroke() {
    const module = this.refs.moduleGroup;
    module.attrs.defaultStroke = this.props.stroke;
    module.attrs.isStrokeRed = false;
  }

  highlightRuleBreakingModules(module, index) {
    const { isDraggingToBoard } = this.props;
    const draggingModuleNode = module || this.refs.moduleGroup;
    const boardGroup = draggingModuleNode.getParent();
    const moduleNodeArray = boardGroup.get('.moduleGroup');
    const boardNode = boardGroup.getParent().get('.board')[0];

    if (index) {
      moduleNodeArray.splice(index, 1);
    }

    const addRedStroke = (node) => {
      node.attrs.isStrokeRed = true;
      node.attrs.name === 'board'
        ? store.dispatch(actions.updateBoardStroke('red'))
        : node.attrs.isStrokeRed = true;
    };

    const removeRedStroke = (node) => {
      node.attrs.isStrokeRed = false;

      node.attrs.name === 'board'
        ? store.dispatch(actions.updateBoardStroke(null))
        : node.attrs.isStrokeRed = false;
    };

    if (!isDraggingToBoard && isDraggingToBoard !== undefined) {
      enforceRules(moduleNodeArray, boardNode, addRedStroke, removeRedStroke);
    }
  }
  
  showDependencies() {
    store.dispatch(actions.updateIconVisibity('DEPENDENCY'));
    store.dispatch(actions.updateCurrentDependencies(this.props.dependencies));
  }
  
/*  showAllModuleIcons() {
    store.dispatch(actions.updateIconVisibity('ALL'));
  }
  
  areDependenciesMet() {
    const { dependencies, metDependencies } = this.props;
    
    if (dependencies && (dependencies.length === metDependencies.length)) {
      return true;
    }
    return false; 
  }*/

  componentDidMount() {
    this.setImage();
    this.setDefaultStroke();
    //this.areDependenciesMet() ? this.showAllModuleIcons() : this.showDependencies()
    setTimeout(() => {/*console.log('called');*/ this.highlightRuleBreakingModules()}, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rotation !== prevProps.rotation) {
      this.highlightRuleBreakingModules();
    }

    if (this.props.shouldCheckCollission === true) {
      this.highlightRuleBreakingModules();
      this.props.toggleShouldCheckCollission();
    }
  }

  updateThumbnail() {
    const module = this.refs.moduleGroup;
    const boardLayer = module.getParent().getParent().getParent();
    const thumbnail = generateThumbnail(boardLayer);

    store.dispatch(actions.updateBoardThumbnail(thumbnail));
  }
  
  getNewPosition() {
    const { boundToSideIndex } = this.props;
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const module = this.refs.moduleGroup;
    const newPosition = {
      x: module.getPosition().x,
      y: module.getPosition().y,
      index: this.props.index,
    };

    return newPosition;
  }
  
  getFill() {
    const { metDependencies, dependencies, isDraggingToBoard, id } = this.props;
    if (id === '100') {
      return null;
    }
    
    if ((metDependencies.length === dependencies.length) || (id === '110')) {
      return 'green';
    }
    
    if (metDependencies.length === 0) {
      return 'red';
    }
    
    if (metDependencies.length < dependencies.length) {
      return 'yellow';
    }
    
  
    
    return null;
  }

  handleMouseOver() {
    this.setState({
      strokeWidth: 1.5,
    });
    document.body.style.cursor = 'move';

    store.dispatch(actions.updateSelectedModule(this.props));
    store.dispatch(actions.toggleIsMouseOverModule(true));
  }

  handleMouseOut() {
    this.setState({
      strokeWidth: 1,
    });

    document.body.style.cursor = 'default';
    store.dispatch(actions.toggleIsMouseOverModule(false));
  }

  handleDragMove() {
    const newPosition = this.getNewPosition();
    store.dispatch(actions.updateModulePosition(newPosition));
  }

  handleDragEnd() {
    const module = this.refs.moduleGroup;
    this.updateThumbnail();
    this.highlightRuleBreakingModules();
  }
  
  handleClick(evt) {
    if (evt.evt.which === 1) {
      this.showDependencies();
    }
  }

  handleDoubleClick() {
    this.props.rotate();
  }
  

  render() {
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const image = (
      <Image
        x={this.props.imageX}
        y={this.props.imageY}
        height={this.props.imageHeight}
        width={this.props.imageWidth}
        image={this.props.imageNode}
      />
    );
    let isStrokeRed;
    let defaultStroke;

    if (this.refs.moduleGroup) {
      isStrokeRed = this.refs.moduleGroup.attrs.isStrokeRed;
      defaultStroke = this.refs.moduleGroup.attrs.defaultStroke;
    }

    return (
      <Group
        draggable="true"
        ref="moduleGroup"
        name="moduleGroup"
        x={anchorPositions
          ? bindToPerimeter(this.props, anchorPositions, boardSpecs).x
          : this.props.x
        }
        y={anchorPositions
          ? bindToPerimeter(this.props, anchorPositions, boardSpecs).y
          : this.props.y
        }
        height={this.props.height}
        width={this.props.width}
        onDragEnd={this.handleDragEnd.bind(this)}
        onDragMove={this.handleDragMove.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}

      >
        <Text
          ref="text"
          x={this.props.textX}
          y={this.props.textY}
          width={this.props.width}
          text={this.props.text}
          fontSize={this.props.fontSize}
          fontFamily={this.props.fontFamily}
        />

        <Group
          ref="innerGroup"
          name="innerGroup"
          x={this.props.innerGroupX}
          y={this.props.innerGroupY}
          rotation={this.props.rotation}
          onClick={this.handleClick.bind(this)}
          onDblClick={this.handleDoubleClick.bind(this)}
        >

          <Rect
            ref="topLayer"
            width={this.props.width}
            height={this.props.height}
            fill={this.getFill()}
            opacity={this.props.opacity}
          />

          <Rect
            name="moduleBorder"
            ref="moduleBorder"
            width={this.props.width}
            height={this.props.height}
            stroke={isStrokeRed ? 'red' : this.props.stroke}
            strokeWidth={this.state.strokeWidth}
          />

          {this.props.imageSrc ? image : <Group />}
        </Group>
      </Group>
    );
  } 
}

ModulesItem.defaultProps = {
  metDependencies: []
}