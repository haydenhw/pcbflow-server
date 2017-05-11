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


function getDependencyDiff(moduleArray) {
  const changedElements = [];
  
  const filterdArray = moduleArray.map((module, index) => {
    const { id, dependencies, metDependencies } = module;
    return {
      index,
      id,
      dependencies,
      metDependencies: metDependencies || []
    };
  });
  
  filterdArray.forEach((module) => {
    const { dependencies, metDependencies, index } = module;
    
    filterdArray.forEach((otherModule) => {
      if (
        (dependencies.indexOf(otherModule.id) !== -1) &&
        (metDependencies.indexOf(otherModule.id) === -1)
      ) {
        metDependencies.push(otherModule.id);
        changedElements.push(index);
      }
    });
  });
   
  return filterdArray.filter(element => changedElements.indexOf(element.index) !== -1);
}

function updateMetDependencies(dependencyDiffArray) {
  dependencyDiffArray.forEach(element => {
    const { metDependencies, index } = element;
    
  
    /*setTimeout(() => {
      store.dispatch(actions.updateMetDependencies({
        metDependencies,
        index
      })),
      1
    });*/
  
  });
}


class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldCheckCollission: false,
    };
  }

  calculatePrice(modules) {
    if (modules && modules.length > 0) {
      const modulePriceSum = this.props.modules
      .map(module => module.price)
      .reduce((a, b) => a + b);
      const basePrice = 15;
      const totalPriceString = generatePriceString(basePrice + modulePriceSum);

      return totalPriceString;
    }

    return generatePriceString(15);
  }
  
  updatePrice() {
    const totalPriceString = this.calculatePrice(this.props.modules);
    store.dispatch(actions.updateProjectPrice(totalPriceString));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modules.length !== this.props.modules.length) {
      this.updatePrice();
    //  console.log(this.props.modules[this.props.modules.length-1].id)
      //const dependencyDiffArray = getDependencyDiff(this.props.modules);
      //updateMetDependencies(dependencyDiffArray);
      
      this.setState({
        shouldCheckCollission: !this.state.shouldCheckCollission,
      });
    }
  }

  componentDidMount() {
    const totalPriceString = this.calculatePrice(this.props.modules);
    store.dispatch(actions.updateProjectPrice(totalPriceString));
  }

  toggleShouldCheckCollission() {
    this.setState({
      shouldCheckCollission: !this.state.shouldCheckCollission,
    });
  }

  render() {
    let modules = [];

    if (this.props.modules) {
      modules = this.props.modules/* [modulesData[0]].*/.map((module, index) =>
        <ModulesItem
          ref="module"
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
          dependencies={module.dependencies}
          topLeftAnchor={this.props.topLeftAnchor}
          selectedModuleProps={this.props.selectedModuleProps}
          anchorPositions={this.props.anchorPositions}
          boardSpecs={this.props.boardSpecs}
          isDraggingToBoard={false}
          rotate={this.props.rotate}
          shouldCheckCollission={this.state.shouldCheckCollission}
          toggleShouldCheckCollission={this.toggleShouldCheckCollission.bind(this)}
        />);
    }
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
  boardSpecs: state.boardSpecs,
  anchorPositions: state.anchorPositions,
});

export default connect(mapStateToProps)(Modules);
