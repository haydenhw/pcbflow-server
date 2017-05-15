import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, hashHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import getTimeStamp from 'helpers/getTimeStamp';
import rotate from 'helpers/rotate';

import Board from 'components/board/Board';
import Module from 'components/modules/ModulesItem';
import ModuleContainer from 'components/modules/Modules';
import BoardDimensionInput from 'components/board/BoardDimensionForm';
import TopNavbar from 'components/top-navbar/TopNavbar';
import SideBar from 'components/side-bar/SideBar';
import TopNavbarEditableText from 'components/top-navbar/TopNavbarEditableText';
import Footer from 'components/footer/Footer';
import DesignToolStage from './DesignToolStage';
import DesignToolInfoButton from './DesignToolInfoButton';
import DocumentationCard from './DesignToolDocumentationCard';

import './design-tool-styles/DesignToolToggleInfoButton.css';
import './design-tool-styles/DesignToolDocumentationCard.css';

let DesignTool = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isSideBarHidden: false,
      isDraggingToBoard: false,
      shouldRender: false,
      shouldUpdateThumbnail: false,
      wasDocumentationOpen: false,  //should be true in production
      shouldRenderDocumentation: false, //should be true in production
      shouldRenderDocumentationButton: true,
      shouldHideContextMenu: false,
      image: null,
    };

    this.toggleDraggingToBoard = this.toggleDraggingToBoard.bind(this);
    this.toggleDocumentationCard = this.toggleDocumentationCard.bind(this);
    this.toggleShouldUpadateThumbnail = this.toggleShouldUpadateThumbnail.bind(this);

    this.bound_handleMouseDown = this.handleMouseDown.bind(this);
    this.bound_handleMouseUp = this.handleMouseUp.bind(this);
    // this.bound_handleClick = this.handleClick.bind(this);
    this.bound_handleMouseMove = this.handleMouseMove.bind(this);
    this.bound_handleKeyUp = this.handleKeyUp.bind(this);
  }

  static keyPress(evt) {
    const evtobj = window.event ? event : evt;

    if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
      store.dispatch(actions.undo());
    }

    if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
      store.dispatch(actions.redo());
    }
  }

  static calculateNewModuleCoordinates(coordinateData) {
    const cd = coordinateData;

    const boundToSide = getPerimeterSide(cd.boundToSideIndex) || null;

    switch (boundToSide) {
      case 'top':
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: 0,
        };
      case 'bottom':
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: cd.boardHeight - cd.height,
        };
      default:
        return {
          x: cd.moduleX - cd.boardX - (cd.width / 2),
          y: cd.moduleY - cd.boardY - (cd.height / 2),
        };
    }
  }

  static handleNameChange(projectId, newName) {
    const nameObject = {
      name: newName.message,
    };

    store.dispatch(actions.updateProject(nameObject, projectId));
  }

  static updateLastSaved() {
    const lastSaved = getTimeStamp();
    store.dispatch(actions.updateLastSavedTime(lastSaved));
  }

  static recordSavedChanges() {
    store.dispatch(actions.toggleHasUnsavedChanges());
  }

  static routeToProjects() {
    hashHistory.push('/projects');
  }

  addHanlders() {
    document.body.addEventListener('mousedown', this.bound_handleMouseDown);
    document.body.addEventListener('mouseup', this.bound_handleMouseUp);
    // document.body.addEventListener('click', this.bound_handleClick);
    document.body.addEventListener('mousemove', this.bound_handleMouseMove);
    document.body.addEventListener('keyup', this.bound_handleKeyUp);
    document.onkeydown = DesignTool.keyPress;
    window.onpopstate = this.toggleShouldUpadateThumbnail.bind(this);

    const shouldConfirmOnReload = false;
    window.onbeforeunload = () => shouldConfirmOnReload ? '' : null;
  }

  removeHanlders() {
    document.body.removeEventListener('mousedown', this.bound_handleMouseDown);
    document.body.removeEventListener('mouseup', this.bound_handleMouseUp);
    document.body.removeEventListener('mousemove', this.bound_handleMouseMove);
    document.body.removeEventListener('keyup', this.bound_handleKeyUp);
  }

  setRouteHook() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (/* true ||*/ this.props.hasUnsavedChanges) {
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
      x: x - (width / 2),
      y: y - (height / 2),
    };

    const testModule = Object.assign(testModuleCoordinates, draggingModuleData);

    let isNewModuleOutOfBounds = checkCollision([testModule, boardSpecs]);
    isNewModuleOutOfBounds = isNewModuleOutOfBounds.length > 0;

    const adjustedModuleCoordinates = DesignTool.calculateNewModuleCoordinates(coordinateData);

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

    if (isMouseOverModule && (evtobj.code === 'Delete')) {
      store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
    }
  }
  
  updateClientPosition(evt) {
    const stageOffsetX = Number(this.stageContainer.getBoundingClientRect().left);
    const stageOffsetY = Number(this.stageContainer.getBoundingClientRect().top);
    const x = Number(evt.clientX) - stageOffsetX;
    const y = Number(evt.clientY) - stageOffsetY;

    this.setState({
      x,
      y,
    });
  }

  handleMouseMove(evt) {
    if (this.state.isDraggingToBoard) {
      this.updateClientPosition(evt);
    }
  }

  handleMouseDown(evt) {
    if (evt.which === 1) {
      store.dispatch(actions.toggleIsMouseDown(true));
    }
  }

  toggleShouldHideContextMenu(boolean) {
    this.setState({
      shouldHideContextMenu: boolean,
    });
  }
  
  handleClick(evt) {
    /*if ((evt.which === 1) && !this.props.isMouseOverModule) {
      store.dispatch(actions.updateIconVisibity('ALL'));
    }*/
  }

  handleMouseUp(evt) {
    if ((evt.which === 1) && !this.state.shouldHideContextMenu) {
        this.toggleShouldHideContextMenu(true);
    }
    
    if ((evt.which === 3) && this.props.isMouseOverModule) {
      this.toggleShouldHideContextMenu(false);
    }

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

  updateState(url) {
    this.setState({ image: url });
  }
  
  showAllModuleIcons() {
    store.dispatch(actions.updateIconVisibity('ALL'));
  }
  

  toggleDocumentationCard() {
    const { shouldRenderDocumentation, wasDocumentationOpen } = this.state;
    this.setState({
      shouldRenderDocumentation: !shouldRenderDocumentation,
      wasDocumentationOpen: !wasDocumentationOpen,
    });
  }

  hideDocumentation() {
    if (!this.props.isMouseOverModule) {
      this.setState({
        shouldRenderDocumentation: false,
        shouldRenderDocumentationButton: false,
      });
    }
  }

  unhideDocumentation() {
    const { wasDocumentationOpen } = this.state;

    this.setState({
      shouldRenderDocumentation: !!wasDocumentationOpen,
      shouldRenderDocumentationButton: true,
    });
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
      showAllModuleIcons,
      iconVisibityData
    } = this.props;
    const {
      x,
      y,
      shouldUpdateThumbnail,
      shouldRenderDocumentation,
      shouldRenderDocumentationButton,
      shouldHideContextMenu,
      isDraggingToBoard
    } = this.state;
    const { height, width } = draggingModuleData;

    const draggingModule = (
      <Module
        x={x - (width / 2)}
        y={y - (height / 2)}
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
        id={'100'}
      />
    );
    
    let sideBar = (
      <SideBar 
        toggleDraggingToBoard={this.toggleDraggingToBoard} 
        showAll={this.showAllModuleIcons}
        iconVisibityData={iconVisibityData}
        onBoardModulesLength={this.props.currentProjectModules.length}
        updateClientPosition={this.updateClientPosition.bind(this)}    
      />
  );
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

    const infoButton = (
      <DesignToolInfoButton
        clickHandler={this.toggleDocumentationCard}
        icon={infoButtonIcon}
      />
    );

    return (
      <div>
        <TopNavbar
          projectName={currentProjectName}
          handleNameChange={DesignTool.handleNameChange.bind(null, currentProjectId)}
          routeToProjects={DesignTool.routeToProjects}
          updateThumbnail={this.toggleShouldUpadateThumbnail}
          updateLastSaved={DesignTool.updateLastSaved}
          recordSavedChanges={DesignTool.recordSavedChanges}
        />

        <div onMouseMove={this.handleMouseMove.bind(this)}>
          <div ref={node => this.stageContainer = node}>
            {sideBar}
            <DesignToolStage
              updateState={this.updateState.bind(this)}
              rotate={this.rotate.bind(this)}
              toggleShouldUpadateThumbnail={this.toggleShouldUpadateThumbnail.bind(this)}
              isDraggingToBoard={isDraggingToBoard}
              shouldRenderBoard={currentProjectName}
              shouldUpdateThumbnail={shouldUpdateThumbnail}
              draggingModule={draggingModule}
              shouldHideContextMenu={shouldHideContextMenu}
              hideDocumentation={this.hideDocumentation.bind(this)}
              unhideDocumentation={this.unhideDocumentation.bind(this)}
            />
          </div>
        </div>
        <Footer
          price={currentProjectPrice}
          timeLastSaved={timeLastSaved}
        />
        {shouldRenderDocumentation && <DocumentationCard />}
        {shouldRenderDocumentationButton && infoButton}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  currentProjectName: state.currentProjectInfo.name,
  currentProjectId: state.currentProjectInfo.id,
  currentProjectPrice: state.currentProjectInfo.price,
  timeLastSaved: state.currentProjectInfo.timeLastSaved,
  currentProjectModules: state.currentProjectModules.present,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  draggingModuleData: state.draggingModule,
  selectedModuleIndex: state.selectedModule.index,
  boardSpecs: state.boardSpecs,
  selectedModuleProps: state.selectedModule,
  anchorPositions: state.anchorPositions,
  iconVisibityData: state.iconVisibity
});

DesignTool = withRouter(DesignTool);
export default connect(mapStateToProps)(DesignTool);

DesignTool.propTypes = {
  currentProjectName: PropTypes.string,
  currentProjectId: PropTypes.string,
  currentProjectPrice: PropTypes.string.isRequired,
  timeLastSaved: PropTypes.string,
  draggingModuleData: PropTypes.object.isRequired,
  selectedModuleIndex: PropTypes.number,
  boardSpecs: PropTypes.object.isRequired,
  selectedModuleProps: PropTypes.object.isRequired,
  anchorPositions: PropTypes.object.isRequired,
  hasUnsavedChanges: PropTypes.object,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
