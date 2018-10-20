import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import generatePriceString from 'helpers/generatePriceString';
import { getUnmetDependencies, updateMetDependencies } from 'helpers/dependencies';
import { getActiveModules } from '../../selectors/moduleSelectors';

import ModulesItem from './ModulesItem';

// put all this in an object called moduleStyles and save it under constants folder
// then pass props as {...moduleStyles}

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
        {...module}
        {...this.props}
        ref="module"
        key={index}
        index={index}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        opacity={opacity}
        strokeWidth={strokeWidth}
        unmetDependencies={getUnmetDependencies(this.props.moduleData, this.props.modules, module.dependencies)}
        shouldCheckCollission={this.state.shouldCheckCollission}
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
