// *Refactor to functional component
import React, { Component } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';

import { getUnmetDependencies } from 'helpers/dependencies';
import { getStroke } from 'helpers/moduleHelpers';
import { moduleDataList } from 'config/moduleDataList';
import { getActiveModules, getHoveredModule } from '../../selectors/moduleSelectors';
import { getActiveProjectBoard } from '../../selectors/projectSelectors';

import ModulesItem from './ModulesItem';

// *put all this in an object called moduleStyles and save it under constants folder
// then pass props as {...moduleStyles}
import {
  fontSize,
  fontFamily,
  fill,
  opacity,
  strokeWidth,
} from 'config/moduleConfig';

class Modules extends Component {
  render() {
    const { modules, board, topLeftAnchor } = this.props;

    // const res = modules[0].x;
    // console.log('modules', res);

    const moduleList = modules.map((module, index) =>
      <ModulesItem
        {...module}
        ref="module"
        key={index}
        board={board}
        index={index}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        opacity={opacity}
        strokeWidth={strokeWidth}
        stroke={getStroke(module.id, module.defaultStroke, modules, board, topLeftAnchor)}
        topLeftAnchor={topLeftAnchor}
        unmetDependencies={getUnmetDependencies(moduleDataList, modules, module.dependencies)}
      />
    );

    return (
      <Group name="moduleGroup">
        {moduleList}
      </Group>
    );
  }
}

const mapStateToProps = state => ({
  board: getActiveProjectBoard(state),
  modules: getActiveModules(state),
  topLeftAnchor: state.anchors.topLeft,
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: [],
};
