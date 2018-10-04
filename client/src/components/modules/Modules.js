import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import generatePriceString from 'helpers/generatePriceString';
import { getUnmetDependencies, getDependencyDiff, updateMetDependencies, getNewDependencyData } from 'helpers/dependencies';

import ModulesItem from './ModulesItem';

import {
  fontSize,
  fontFamily,
  fill,
  opacity,
  stroke,
  strokeWidth,
} from 'config/moduleConfig';

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldCheckCollission: false,
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.modules.length !== this.props.modules.length)) {
      store.dispatch(actions.toggleShouldRenderSideBar(true));

      this.setState({
        shouldCheckCollission: !this.state.shouldCheckCollission,
      });
    }
  }

  toggleShouldCheckCollission() {
    this.setState({
      shouldCheckCollission: !this.state.shouldCheckCollission,
    });
  }

  render() {
    const modules = this.props.modules/* [modulesData[0]].*/.map((module, index) =>
      <ModulesItem
        ref="module"
        key={index}
        index={index}
        x={module.x}
        y={module.y}
        width={module.width}
        height={module.height}
        name={module.name}
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
        id={module.id}
        dependencies={module.dependencies}
        unmetDependencies={getUnmetDependencies(this.props.moduleData, this.props.modules, module.dependencies)}
        checkCollisionTrigger={this.props.checkCollisionTrigger}
        topLeftAnchor={this.props.topLeftAnchor}
        hoveredModuleProps={this.props.hoveredModuleProps}
        anchorPositions={this.props.anchorPositions}
        boardSpecs={this.props.boardSpecs}
        isDraggingToBoard={this.props.isDraggingToBoard}
        rotate={this.props.rotate}
        shouldCheckCollission={this.state.shouldCheckCollission}
        iconVisibityMode={this.props.iconVisibityMode}
        toggleShouldCheckCollission={this.toggleShouldCheckCollission.bind(this)}
      />,
    );

    return (
      <Group name="moduleGroup">
        {modules}
      </Group>
    );
  }
}

const mapStateToProps = state => ({
  anchorPositions: state.anchorPositions,
  boardSpecs: state.boardSpecs,
  checkCollisionTrigger: state.boardSpecs.checkCollisionTrigger,
  showAllIcons: state.showAllIcons,
  modules: state.activeModules.present,
  moduleData: state.moduleData,
  hoveredModuleProps: state.hoveredModule,
  topLeftAnchor: state.anchorPositions.topLeft,
  tutorialStep: state.tutorial.step,
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: [],
};
