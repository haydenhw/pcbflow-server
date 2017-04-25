
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
      image: null
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.highlightRuleBreakingMoudles();
  }
  
  componentDidMount() {
    if (this.props.imageSrc) {
      const image = new window.Image();
      image.src = this.props.imageSrc;
      image.onload = () => 
      store.dispatch(actions.updateModuleImage({
        index: this.props.index,
        imageNode: image
      }))
    }
    
      this.highlightRuleBreakingMoudles();
  }
  
  highlightRuleBreakingMoudles() {
    const draggingModuleNode = this.refs.moduleGroup;
    const boardGroup = draggingModuleNode.getParent();
    const moduleNodes = boardGroup.get(".moduleGroup");
    const boardNode = boardGroup.getParent().get(".board")[0];
    
    const addRedStroke = node => {
      node.attrs.name === "moduleGroup" 
        ? node.get(".moduleBorder")[0].attrs.stroke = "red"
        : node.attrs.stroke = "red";
    }
    
    const removeRedStroke = node => {
      node.attrs.name === "moduleGroup" 
        ? node.get(".moduleBorder")[0].attrs.stroke = "black"
        : node.attrs.stroke = null
    }
    if(!this.props.isDraggingToBoard) {
      enforceRules(moduleNodes, boardNode, addRedStroke, removeRedStroke);
    }
  }
  
  updateThumbnail()  {
    const module = this.refs.moduleGroup;
    const boardLayer = module.getParent().getParent().getParent();
    const thumbnail = generateThumbnail(boardLayer);
    
    store.dispatch(actions.updateBoardThumbnail(thumbnail));
  }
  
  handleMouseOver() {
    store.dispatch(actions.updateSelectedModule(this.props));
    store.dispatch(actions.toggleIsMouseOverModule(true));
  }
  
  handleMouseOut() {
    store.dispatch(actions.toggleIsMouseOverModule(false));
  }
  
  handleDragMove() {
    const { boundToSideIndex } = this.props;
    
    if (Number.isInteger(boundToSideIndex)) {
      const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
      const module =  this.refs.moduleGroup;
      const newPosition = {
        x: module.getPosition().x,
        y: module.getPosition().y,
        index: this.props.index
      }
      
      store.dispatch(actions.updateModulePosition(newPosition));
    }
    const module =  this.refs.moduleGroup;
    
    this.highlightRuleBreakingMoudles();
  }
  
  handleDragEnd() {
    const module = this.refs.moduleGroup;
    
    const newPosition = {
      x: module.getX(),
      y: module.getY(),
      index: module.index
    }
    store.dispatch(actions.updateModulePosition(newPosition));
    
    this.updateThumbnail();
    this.highlightRuleBreakingMoudles();
  }
  
  handleDoubleClick() {
    this.highlightRuleBreakingMoudles();
    //store.dispatch(actions.rotateAboutCenterSelectedModule(this.props))
  }
  
  render() {
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const borderNode = this.refs.moduleBorder;
    const borderStroke = borderNode ? borderNode.attrs.stroke : null;
    const image = (
      <Image
        x={this.props.imageX}
        y={this.props.imageY}
        height={this.props.imageHeight}
        width={this.props.imageWidth}
        image={this.props.imageNode}
      />
    );
    
    return (
      <Group 
        draggable="true"
        ref="moduleGroup"
        name="moduleGroup"
        x={ Boolean(anchorPositions)
          ? bindToPerimeter(this.props, anchorPositions, boardSpecs).x
          : this.props.x
        }
        y={Boolean(anchorPositions)
          ? bindToPerimeter(this.props, anchorPositions, boardSpecs).y
          : this.props.y}
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
            onDblClick={this.handleDoubleClick.bind(this)}
          >
              
            <Rect
              ref="topLayer"
              width={this.props.width} 
              height={this.props.height}
              fill={this.props.fill}
              opacity={this.props.opacity}
            />
               
            <Rect
              name="moduleBorder"
              ref="moduleBorder"
              width={this.props.width} 
              height={this.props.height}
              stroke = {borderStroke || this.props.stroke}
              strokeWidth = {this.props.strokeWidth}
            />
               
            {this.props.imageSrc ? image: <Group></Group>}
        </Group>
      </Group>
    )
  }
}

