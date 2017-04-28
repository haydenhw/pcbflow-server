import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import Konva from 'konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import generatePriceString from 'helpers/generatePriceString';
import ModulesItem from './ModulesItem';
import { modulesData } from './modulesData';
import {
  fontSize,
  fontFamily,
  fill,
  opacity,
  stroke,
  strokeWidth,
} from 'config/moduleConfig';

class Modules extends Component {

  componentDidUpdate() {
    if (this.props.modules.length > 0) {
      const modulePriceSum = this.props.modules
        .map(module => module.price)
        .reduce((a, b) => a + b);
      const basePrice = 15;
      const totalPriceString = generatePriceString(basePrice + modulePriceSum);

      //store.dispatch(actions.updateProjectPrice(totalPriceString));
    }
    
    
  }
  render() {
    const modules = this.props.modules/* [modulesData[0]].*/.map((module, index) =>
    /*  console.log(module.imageSrc)
      console.log(require(`./modules-images/${module.imageSrc}`))*/
    // console.log(module.stroke)
      <ModulesItem
        key={index}
        index={index}
        x={module.x}
        y={module.y}
        width={module.width}
        height={module.height}
        boundToSideIndex={module.boundToSideIndex}
        innerGroupX={module.innerGroupX}
        innerGroupY={module.innerGroupY}
        rotation={module.rotation}
        text={module.text}
        textX={module.textX}
        textY={module.textY}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        opacity={opacity}
        stroke={module.stroke}
        strokeWidth={strokeWidth}
        imageX={module.imageX}
        imageY={module.imageY}
        imageWidth={module.imageWidth}
        imageHeight={module.imageHeight}
        imageSrc={module.imageSrc}
        imageNode={module.imageNode}
        iconSrc={module.iconSrc}
        topLeftAnchor={this.props.topLeftAnchor}
        selectedModuleProps={this.props.selectedModuleProps}
        anchorPositions={this.props.anchorPositions}
        boardSpecs={this.props.boardSpecs}
        isDraggingToBoard={false}
      />);
    return (
      <Group>
        {modules}
      </Group>
    );
  }

}

const mapStateToProps = state => ({
  modules: state.currentProjectModules.present,
  topLeftAnchor: state.anchorPositions.topLeft,
  selectedModuleProps: state.selectedModule,
  boardSpecs: state.boardSpecs.present,
  anchorPositions: state.anchorPositions,
});

export default connect(mapStateToProps)(Modules);
