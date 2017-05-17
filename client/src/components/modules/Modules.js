import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import Konva from 'konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import generatePriceString from 'helpers/generatePriceString';
import { getDependencyDiff, updateMetDependencies } from 'helpers/dependencies';

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
  
  updateDisplayedDependencies() {
    function areDependenciesMet(dependencies, metDependencies) {
      return dependencies ? (dependencies.length === metDependencies.length) : true;
    }
    
    const findUnmetDependency = dependencyDiffArray => (
      dependencyDiffArray.find(element => (
        !areDependenciesMet(element.dependencies, element.metDependencies)
      ))
    );
    
    function dispatchDependencyData({visibilityMode, dependencyData}) {
      setTimeout(() => {
        store.dispatch(actions.updateIconVisibity(visibilityMode));
        store.dispatch(actions.updateCurrentDependencies(dependencyData));
        store.dispatch(actions.toggleShouldRenderSideBar(true));
      }, 5);
    }
    
  function getNewDependencyData(dependencyDiffArray) {
    const nextParentToDisplay = findUnmetDependency(dependencyDiffArray);
    
    const nullData = {
      dependencies: [],
      index: null,
      text: null,
      moduleName: null
    }
    
    if (nextParentToDisplay) {
      return {
        visibilityMode: 'DEPENDENCY',
        dependencyData: nextParentToDisplay
      }
    }
    
    return {
      visibilityMode: 'ALL',
      dependencyData: nullData
    }
  }
    
    const { currentDependencyData, modules } = this.props;
    const { index } = currentDependencyData;
    
    const dependencyDiffArray = getDependencyDiff(modules);
    const displayedParentData = dependencyDiffArray[index];
    
    const newDepenencyData = getNewDependencyData(dependencyDiffArray);
    dispatchDependencyData(newDepenencyData);
    
  }
  
  
  updateMetDependencies() {
    const dependencyDiffArray = getDependencyDiff(this.props.modules);
    updateMetDependencies(dependencyDiffArray);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.modules.length !== this.props.modules.length)) {
      this.updateMetDependencies();
      this.updateDisplayedDependencies();
      this.updatePrice();
      
      this.setState({
        shouldCheckCollission: !this.state.shouldCheckCollission,
      });
    }
  }
  
  componentDidMount() {
    const totalPriceString = this.calculatePrice(this.props.modules);
    
    this.updateMetDependencies();
    this.updateDisplayedDependencies();
    store.dispatch(actions.updateProjectPrice(totalPriceString));
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
        metDependencies={module.metDependencies}
        topLeftAnchor={this.props.topLeftAnchor}
        selectedModuleProps={this.props.selectedModuleProps}
        anchorPositions={this.props.anchorPositions}
        boardSpecs={this.props.boardSpecs}
        isDraggingToBoard={this.props.isDraggingToBoard}
        rotate={this.props.rotate}
        shouldCheckCollission={this.state.shouldCheckCollission}
        iconVisibityMode={this.props.iconVisibityMode}
        toggleShouldCheckCollission={this.toggleShouldCheckCollission.bind(this)}
      />
    );
    
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
  iconVisibityMode: state.iconVisibity.mode,
  currentDependencyData: state.iconVisibity
});

export default connect(mapStateToProps)(Modules);

Modules.defaultProps = {
  modules: []
}