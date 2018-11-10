import React, { Component } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';

import { getUnmetDependencies } from 'helpers/dependencies';
import { moduleDataList } from 'config/moduleDataList';
import { getActiveModules } from '../../selectors/moduleSelectors';
import { getActiveProjectBoard } from '../../selectors/projectSelectors';

import ModulesItem from './ModulesItem';

// put all this in an object called moduleStyles and save it under constants folder
// then pass props as {...moduleStyles}

import {
  fontSize,
  fontFamily,
  fill,
  opacity,
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
    const modules = this.props.modules.map((module, index) =>
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
        unmetDependencies={getUnmetDependencies(moduleDataList, this.props.modules, module.dependencies)}
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
  board: getActiveProjectBoard(state),
  checkCollisionTrigger: state.board.checkCollisionTrigger,
  showAllIcons: state.sideBar.showAllIcons,
  modules: getActiveModules(state),
  hoveredModuleProps: state.modules.hoveredId,
  topLeftAnchor: state.anchors.topLeft,
  tutorialStep: state.tutorial.step,
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: [],
};
