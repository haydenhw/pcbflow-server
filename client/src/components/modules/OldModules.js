import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ModulesItem from './ModulesItem';
import { modulesData } from './modulesData';

class MoudleContainer extends Component {

  render() {
    const modules = modulesData.map((module, index) =>

      // console.log('rerendering from ModuleList', modules.image)
      <ModulesItem
        key={index}
        index={index}
        x={module.x}
        y={module.y}
        width={module.width}
        height={module.height}
        rotation={module.rotation}
        text={module.text}
        textX={module.textX}
        textY={module.textY}
        fontSize={module.fontSize}
        fontFamily={module.fontFamily}
        fill={module.fill}
        opacity={module.opacity}
        stroke={module.stroke}
        strokeWidth={module.strokeWidth}
        imageX={module.imageX}
        imageY={module.imageY}
        imageWidth={module.imageWidth}
        imageHeight={module.imageHeight}
        imageSrc={module.imageSrc}
        iconSrc={module.iconSrc}
      />);
    return (
      <Group>
        {modules}
      </Group>
    );
  }

}

const mapStateToProps = state => ({
  modules: state.currentProjectModules,
});

export default connect(mapStateToProps)(MoudleContainer);
