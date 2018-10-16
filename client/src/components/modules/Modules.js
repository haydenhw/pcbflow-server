import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import generatePriceString from 'helpers/generatePriceString';
import { getUnmetDependencies, updateMetDependencies } from 'helpers/dependencies';
import { getActiveModules } from '../../selectors/moduleSelectors';

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
    const modules = this.props.modules/* [moduleData[0]].*/.map((module, index) =>
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
        dependencyId={module.dependencyId}
        dependencies={module.dependencies}
        unmetDependencies={getUnmetDependencies(this.props.moduleData, this.props.modules, module.dependencies)}
        checkCollisionTrigger={this.props.checkCollisionTrigger}
        topLeftAnchor={this.props.topLeftAnchor}
        hoveredModuleProps={this.props.hoveredModuleProps}
        anchors={this.props.anchors}
        board={this.props.board}
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
  anchors: state.anchors,
  board: state.board,
  checkCollisionTrigger: state.board.checkCollisionTrigger,
  showAllIcons: state.sideBar.showAllIcons,
  modules: getActiveModules(state),
  moduleData: state.modules.dataList,
  hoveredModuleProps: state.modules.hovered,
  topLeftAnchor: state.anchors.topLeft,
  tutorialStep: state.tutorial.step,
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: [],
};
