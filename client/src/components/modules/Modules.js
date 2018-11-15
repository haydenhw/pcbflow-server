// *Refactor to functional component
import React, { Component } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';

import { getUnmetDependencies } from 'helpers/dependencies';
import { getStroke } from 'helpers/moduleHelpers';
import { moduleDataList } from 'config/moduleDataList';
import { moduleStyles } from 'config/moduleConfig';
import { getActiveModules } from '../../selectors/moduleSelectors';
import { getActiveProjectBoard } from '../../selectors/projectSelectors';

import ModulesItem from './ModulesItem';

// *put all this in an object called moduleStyles and save it under constants folder
// then pass props as {...moduleStyles}


class Modules extends Component {
  render() {
    const { modules, board, topLeftAnchor } = this.props;

    const moduleList = modules.map((module, index) =>
      <ModulesItem
        {...module}
        {...moduleStyles}
        ref="module"
        key={index}
        board={board}
        index={index}
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
