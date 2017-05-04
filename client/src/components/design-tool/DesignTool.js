import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import BoardDimensionInput from 'components/board/BoardDimensionForm';
import TopNavbar from 'components/top-navbar/TopNavbar';
import SideBar from 'components/side-bar/SideBar';
import TopNavbarEditableText from 'components/top-navbar/TopNavbarEditableText';
import Footer from 'components/footer/Footer';
import DesignToolStage from './DesignToolStage';
import SaveButton from './DesignToolSaveButton';
import DesignToolInfoButton from './DesignToolInfoButton';
import DocumentationCard from './DesignToolDocumentationCard';

import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import getTimeStamp from 'helpers/getTimeStamp';
import rotate from 'helpers/rotate';

import './design-tool-styles/DesignToolToggleInfoButton.css';
import './design-tool-styles/DesignToolDocumentationCard.css';

class DesignTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isSideBarHidden: false,
      isDraggingToBoard: false,
      shouldRender: false,
      shouldUpdateThumbnail: false,
      shouldRenderDocumentation: true,
      image: null,
    };

    this.bound_handleMouseDown = this.handleMouseDown.bind(this);
    this.bound_handleMouseUp = this.handleMouseUp.bind(this);
    this.bound_handleMouseMove = this.handleMouseMove.bind(this);
    this.bound_handleKeyUp = this.handleKeyUp.bind(this);
  }

  keyPress(evt) {
    const evtobj = window.event ? event : evt;

    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
      store.dispatch(actions.undo());
    }

    if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
      store.dispatch(actions.redo());
    }
  }


  addHanlders() {
    document.body.addEventListener('mousedown', this.bound_handleMouseDown);
    document.body.addEventListener('mouseup', this.bound_handleMouseUp);
    document.body.addEventListener('mousemove', this.bound_handleMouseMove);
    document.body.addEventListener('keyup', this.bound_handleKeyUp);
    document.onkeydown = this.keyPress;
    window.onpopstate = this.toggleShouldUpadateThumbnail.bind(this);
  }

  removeHanlders() {
    document.body.removeEventListener('mousedown', this.bound_handleMouseDown);
    document.body.removeEventListener('mouseup', this.bound_handleMouseUp);
    document.body.removeEventListener('mousemove', this.bound_handleMouseMove);
    document.body.removeEventListener('keyup', this.bound_handleKeyUp);
  }

  setRouteHook() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.props.hasUnsavedChanges) {
        return 'Changes you made will not be saved. Are you sure you want to leave?';
      }
    });
  }

  componentDidMount() {
    if (!this.props.currentProjectName) {
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname;

      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }

    this.setRouteHook();
    this.addHanlders();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
    this.removeHanlders();
  }

  calculateNewModuleCoordinates(coordinateData) {
    const cd = coordinateData;

    const boundToSide = getPerimeterSide(cd.boundToSideIndex) || null;

    switch (boundToSide) {
      case 'top':
        return {
          x: cd.moduleX - cd.boardX - cd.width / 2,
          y: 0,
        };
        break;
      case 'bottom':
        return {
          x: cd.moduleX - cd.boardX - cd.width / 2,
          y: cd.boardHeight - cd.height,
        };
        break;
      default:
        return {
          x: cd.moduleX - cd.boardX - cd.width / 2,
          y: cd.moduleY - cd.boardY - cd.height / 2,
        };
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
      boardHeight: boardSpecs.height,
    };

    const testModuleCoordinates = {
      x: x - width / 2,
      y: y - height / 2,
    };

    const testModule = Object.assign(testModuleCoordinates, draggingModuleData);

    let isNewModuleOutOfBounds = checkCollision([testModule, boardSpecs]);
    isNewModuleOutOfBounds = isNewModuleOutOfBounds.length > 0;

    const adjustedModuleCoordinates = this.calculateNewModuleCoordinates(coordinateData);

    const newModule = Object.assign(adjustedModuleCoordinates, draggingModuleData);

    if (isNewModuleOutOfBounds && this.state.isDraggingToBoard) {
      store.dispatch(actions.pushToCurrentProjectModules(newModule));
    }

    this.timeOut = setTimeout(() => store.dispatch(actions.mouseDownOnIcon(false)), 1);
    this.setState({ isDraggingToBoard: false });
  }

  handleKeyUp(evt) {
    const evtobj = window.event ? event : evt;
    const { isMouseOverModule, selectedModuleIndex } = this.props;

    if (isMouseOverModule && evtobj.code === 'Delete') {
      store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
    }
  }

  handleMouseMove(evt) {
    const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
    const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
    const x = Number(evt.clientX) - stageOffsetX;
    const y = Number(evt.clientY) - stageOffsetY;

    this.setState({ x, y });
  }

  handleMouseDown(evt) {
    if (evt.which === 1) {
      store.dispatch(actions.toggleIsMouseDown(true));
    }
  }

  handleMouseUp() {
    // this.setState({isDraggingToBoard: false});
    this.dropDraggingModule();
    store.dispatch(actions.toggleIsMouseDown(false));
  }

  toggleDraggingToBoard() {
    this.setState({ isDraggingToBoard: true });
  }

  toggleShouldUpadateThumbnail() {
    this.setState({
      shouldUpdateThumbnail: !this.state.shouldUpdateThumbnail,
    });
  }

  handleNameChange(projectId, newName) {
    const nameObject = {
      name: newName.message,
    };

    store.dispatch(actions.updateProject(nameObject, projectId));
  }

  updateState(url) {
    this.setState({ image: url });
  }

  updateLastSaved() {
    const lastSaved = getTimeStamp();
    store.dispatch(actions.updateLastSavedTime(lastSaved));
  }

  toggleDocumentationCard() {
    this.setState({
      shouldRenderDocumentation: !this.state.shouldRenderDocumentation,
    });
  }

  recordSavedChanges() {
    store.dispatch(actions.toggleHasUnsavedChanges());
  }
  
  rotate() {
    const { selectedModuleProps, anchorPositions, boardSpecs } = this.props;
    const rotationData = rotate(selectedModuleProps, anchorPositions, boardSpecs);
    store.dispatch(actions.rotateSelectedModule(rotationData));
  }

  render() {
    const {
      currentProjectName,
      currentProjectId,
      currentProjectPrice,
      timeLastSaved,
      draggingModuleData,
      isMouseDownOnIcon,
    } = this.props;
    const { height, width, image } = draggingModuleData;
    const { x, y, isDraggingToBoard, shouldUpdateThumbnail, shouldRenderDocumentation } = this.state;
    const draggingModule = (<Module x={x - width / 2} y={y - height / 2} width={draggingModuleData.width} height={draggingModuleData.height} stroke={draggingModuleData.stroke} strokeWidth={draggingModuleData.strokeWidth} imageX={draggingModuleData.imageX} imageY={draggingModuleData.imageY} imageWidth={draggingModuleData.imageWidth} imageHeight={draggingModuleData.imageHeight} imageSrc={draggingModuleData.imageSrc} imageNode={draggingModuleData.imageNode} isDraggingToBoard />);

    let sideBar = (<SideBar toggleDraggingToBoard={this.toggleDraggingToBoard.bind(this)} />);
    sideBar = this.state.isDraggingToBoard
      ? ''
      : sideBar;

    const infoButtonIconClass = shouldRenderDocumentation ? 'fa-close' : 'fa-question';

    const infoButtonIcon = (
      <FontAwesome
        className={infoButtonIconClass}
        name={infoButtonIconClass}
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );


    const imageStyle = {
      height: '150px',
      width: '200px',
    };
    return (
      <div>
        {/* {true? <img style={imageStyle} src={this.props.boardSpecs.thumbnail} /> : <div></div>} */}
        <TopNavbar projectName={currentProjectName} handleNameChange={this.handleNameChange.bind(null, currentProjectId)} routeToProjects={() => hashHistory.push('/projects')} updateThumbnail={this.toggleShouldUpadateThumbnail.bind(this)} updateLastSaved={this.updateLastSaved} recordSavedChanges={this.recordSavedChanges} />
        <div onMouseMove={this.handleMouseMove.bind(this)}>
          <div ref={node => this.stageContainer = node}>
            {sideBar}
            <DesignToolStage updateState={this.updateState.bind(this)} rotate={this.rotate.bind(this)} toggleShouldUpadateThumbnail={this.toggleShouldUpadateThumbnail.bind(this)} shouldRenderBoard={currentProjectName} shouldUpdateThumbnail={shouldUpdateThumbnail} draggingModule={draggingModule}  />
          </div>
        </div>
        <Footer price={currentProjectPrice} timeLastSaved={timeLastSaved} /> {this.state.shouldRenderDocumentation && <DocumentationCard />}
        <DesignToolInfoButton
          clickHandler={this.toggleDocumentationCard.bind(this)}
          icon={infoButtonIcon}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentProjectName: state.currentProjectInfo.name,
  currentProjectId: state.currentProjectInfo.id,
  currentProjectPrice: state.currentProjectInfo.price,
  timeLastSaved: state.currentProjectInfo.timeLastSaved,
  currentProjectModules: state.currentProjectModules,
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseDown: state.mouseEvents.isMouseDown,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  draggingModuleData: state.draggingModule,
  selectedModuleIndex: state.selectedModule.index,
  boardSpecs: state.boardSpecs,
  selectedModuleProps: state.selectedModule,
  anchorPositions: state.anchorPositions,
  
  /*  hasUnsavedChanges: state.hasUnsavedChanges.bool*/
});

DesignTool = withRouter(DesignTool);
export default connect(mapStateToProps)(DesignTool);
