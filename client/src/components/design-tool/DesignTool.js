import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import BoardDimensionInput from 'components/board/BoardDimensionForm';
import TopNavbar from 'components/top-navbar/TopNavbar';
import SideBar from 'components/side-bar/SideBar';
import DesignToolStage from './DesignToolStage';
import SaveButton from './DesignToolSaveButton';
import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import TopNavbarEditableText from 'components/top-navbar/TopNavbarEditableText'

class DesignTool extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      x: 0,
      y: 0,
      isSideBarHidden:false,
      isDraggingToBoard: false
    }
  }
  
  componentDidMount() {
    if(!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname
      
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }
    
    document.body.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.body.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.body.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.body.addEventListener('keyup', this.handleKeyUp.bind(this))
  }
  
  calculateNewModuleCoordinates(coordinateData) {
    const cd = coordinateData;
    
    const boundToSide = getPerimeterSide(cd.boundToSideIndex) || null;
    
    switch(boundToSide) {
      case "top":
        return {
          x: cd.moduleX - cd.boardX - cd.width/2,
          y: 0
        }
        break;
        case "bottom":
          return {
            x: cd.moduleX - cd.boardX - cd.width/2,
            y: cd.boardHeight - cd.height
          }
          break;
      default:
        return {
          x: cd.moduleX - cd.boardX - cd.width/2,
          y: cd.moduleY - cd.boardY - cd.height/2,
        }
        break;
    }
  }
  
  dropDraggingModule() {
    const { draggingModuleData, boardSpecs } = this.props;
    const { width, height, boundToSideIndex } = draggingModuleData;
    const { x, y } = this.state;
    
    const coordinateData = {
      width,
      height,
      boundToSideIndex,
      moduleX: x,
      moduleY: y,
      boardX: boardSpecs.x,
      boardY: boardSpecs.y,
      boardHeight: boardSpecs.height
    }

    const testModuleCoordinates = {
      x: x - width/2,
      y: y - height/2
    }
    
    const testModule = Object.assign(testModuleCoordinates, draggingModuleData);
     
    let isNewModuleOutOfBounds = checkCollision([testModule, boardSpecs]);
    isNewModuleOutOfBounds = isNewModuleOutOfBounds.length > 0 ? true : false;
    
    const adjustedModuleCoordinates = this.calculateNewModuleCoordinates(coordinateData);
    
    const newModule = Object.assign(adjustedModuleCoordinates, draggingModuleData);
    
    if (isNewModuleOutOfBounds && this.state.isDraggingToBoard) {
      store.dispatch(actions.pushToCurrentProjectModules(newModule));
    }
    
    setTimeout(() => store.dispatch(actions.mouseDownOnIcon(false)), 1 )
    this.setState({isDraggingToBoard: false});
  }
  
  handleKeyUp(evt) {
    const {isMouseOverModule, selectedModuleIndex } = this.props;
    
    if(isMouseOverModule) {
      store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
    }
  }
  
  handleMouseMove(evt) {
    const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
    const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
    const x = Number(evt.clientX) - stageOffsetX;
    const y = Number(evt.clientY) - stageOffsetY;
    
    this.setState({x, y});
  }
  
  handleMouseDown(evt) {
    if(evt.which === 1) {
      store.dispatch(actions.toggleIsMouseDown(true))
    }
  }
  
  handleMouseUp() {
    this.dropDraggingModule();
    store.dispatch(actions.toggleIsMouseDown(false));
  }
  
  toggleDraggingToBoard() {
    if (this.props.isMouseDownOnIcon){
      this.setState({isDraggingToBoard: true});
    } 
  }
  
  handleNameChange(projectId, newName) {
    
    const nameObject = {
      name: newName.message
    }
    store.dispatch(actions.updateProject(nameObject, projectId))
  }
  
  render () {
    const { currentProjectName, currentProjectId, draggingModuleData , isMouseDownOnIcon } = this.props;
    const {height, width, image } = draggingModuleData;
    const { x, y, isDraggingToBoard } = this.state;
    const draggingModule = ( 
      <Module
        x={x - width/2} 
        y={y - height/2}
        width={draggingModuleData.width}
        height={draggingModuleData.height}
        stroke={draggingModuleData.stroke}
        strokeWidth={draggingModuleData.strokeWidth}
        imageX={draggingModuleData.imageX}
        imageY={draggingModuleData.imageY}
        imageWidth={draggingModuleData.imageWidth}
        imageHeight={draggingModuleData.imageHeight}
        imageSrc={draggingModuleData.imageSrc} 
        imageNode={draggingModuleData.imageNode}
      />
    );
      
    let sideBar = (
        <SideBar 
          toggleDraggingToBoard = {this.toggleDraggingToBoard.bind(this)} 
        /> 
    );
    sideBar = isDraggingToBoard ? '' : sideBar;

    return (
      <div>
          <TopNavbar 
            projectName={currentProjectName} 
            handleNameChange={this.handleNameChange.bind(null, currentProjectId)}
          />
          <div onMouseMove={this.handleMouseMove.bind(this)}>
            <div ref={(node) => this.stageContainer = node} >
            
              {sideBar}
            
              <DesignToolStage 
                shouldRenderBoard = { currentProjectName }
                draggingModule = { draggingModule }
              />  
            </div>
        </div>
      </div>
     );
   }
}

const mapStateToProps = (state) => ({
  currentProjectName: state.currentProjectInfo.name,
  currentProjectId: state.currentProjectInfo.id,
  currentProjectModules: state.currentProjectModules,
  boardSpecs: state.boardSpecs,
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseDown: state.mouseEvents.isMouseDown,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  draggingModuleData: state.draggingModule,
  selectedModuleIndex: state.selectedModule.index,
  
  
});

export default connect(mapStateToProps)(DesignTool);
