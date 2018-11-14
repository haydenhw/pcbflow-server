import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';
import Joyride from 'react-joyride';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import {
  getProjects,
  getActiveProject,
  getActiveProjectName,
  getActiveProjectBoard,
} from '../../selectors/projectSelectors';

import {
  getActiveModules,
  getHoveredModule,
} from '../../selectors/moduleSelectors';

import checkCollision from 'helpers/checkCollision';
import getPerimeterSide from 'helpers/getPerimeterSide';
import { routeToHome, routeToProjects } from 'helpers/routeHelpers';
import { isMobile } from 'helpers/isMobile';
import { toolTips } from 'config/toolTips';

import TopNavbar from 'components/top-navbar/TopNavbar';
import SideBar from 'components/side-bar/SideBar';
import Footer from 'components/footer/Footer';
import Modal from 'components/modal/Modal';
import DesignToolStage from './DesignToolStage';
import DesignToolInfoButton from './DesignToolInfoButton';
import DocumentationCard from './DesignToolDocumentationCard';
import DesignToolBoardFrame from './DesignToolBoardFrame';
import DesignToolTodo from './DesignToolTodo';

import { tourSteps, dependecyDemo } from './DesignToolTourSteps';
import { tutorialSteps } from './DesignToolTutorialSteps';

import './design-tool-styles/_DesignToolDocumentationCard.scss';
import './design-tool-styles/_DesignToolOnboardModal.scss';

let DesignTool = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialSteps,
      tourSteps,
      disabledIconExceptions: null,
      isDraggingToBoard: false,
      isNavMenuActive: false,
      isMobile: false,
      joyrideStep: 0,
      running: false,
      shouldExportPDF: false,
      shouldHideContextMenu: false,
      showDocumentation: false,
      showInfoButton: true,
      showModal: true,
      wasDocumentationOpen: false,
    };

    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
    this.hideFloatingElements = this.hideFloatingElements.bind(this);
    this.rotate = this.rotate.bind(this);
    this.toggleDocumentationCard = this.toggleDocumentationCard.bind(this);
    this.toggleDraggingToBoard = this.toggleDraggingToBoard.bind(this);
    this.toggleNavMenu = this.toggleNavMenu.bind(this);
    this.unhideFloatingElements = this.unhideFloatingElements.bind(this);

    this.bound_handleKeyUp = this.handleKeyUp.bind(this);
    this.bound_handleMouseDown = this.handleMouseDown.bind(this);
    this.bound_handleMouseUp = this.handleMouseUp.bind(this);
  }

  static defaultProps = {
    joyride: {
      autoStart: true,
      resizeDebounce: false,
      run: false,
    },
  };

  addHanlders() {
    document.body.addEventListener('mousedown', this.bound_handleMouseDown);
    document.body.addEventListener('mouseup', this.bound_handleMouseUp);
    document.body.addEventListener('mousemove', this.bound_handleMouseMove);
    document.body.addEventListener('keyup', this.bound_handleKeyUp);
    document.onkeydown = this.handleKeyPress;

    window.onresize = this.checkIfMobile.bind(this);
  }

  removeHanlders() {
    document.body.removeEventListener('mousedown', this.bound_handleMouseDown);
    document.body.removeEventListener('mouseup', this.bound_handleMouseUp);
    document.body.removeEventListener('mousemove', this.bound_handleMouseMove);
    document.body.removeEventListener('keyup', this.bound_handleKeyUp);
  }

  componentDidMount() {
    if (this.props.projects.length === 0) {
      // consider removing this logic
      const projectId = this.props.params.projectId;
      const currentRoute = this.props.location.pathname;
      store.dispatch(actions.fetchProjectById(projectId, currentRoute));
    }

    this.addHanlders();
    this.checkIfMobile();
    store.dispatch(actions.startTutorialIfNotOffered());
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeProjectId, params, saveProjectTrigger } = this.props;

    if (prevProps.saveProjectTrigger !== saveProjectTrigger) {
      // *refactor to not depend on setTimeout
      setTimeout(() => store.dispatch(actions.updateProject(this.props)), 0);
    }

    if (
      !activeProjectId
      // && projects
      // && projects.length > 0
    ) {

      const projectId = params.projectId;
      store.dispatch(actions.setActiveProjectId(projectId));
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
    this.removeHanlders();
  }

  addTooltip(toolTipData) {
    this.joyride.addTooltip(toolTipData);
  }

  getNewModuleCoordinates(coordinateData) {
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

  checkIfMobile() {
    this.setState({ isMobile: isMobile() });
  }

  dropDraggingModule(evt) {
    const { draggingModule, board, anchors } = this.props;
    const { width, height, boundToSideIndex } = draggingModule;
    const { topLeft } = anchors;
    const { isDraggingToBoard } = this.state;
    const { clientX: x , clientY: y } = evt;

    const coordinateData = {
      width,
      height,
      boundToSideIndex,
      moduleX: x,
      moduleY: y,
      boardX: board.x,
      boardY: board.y,
      boardHeight: board.height,
    };

    const testModuleCoordinates = {
      x: x - (width / 2),
      y: y - (height / 2),
    };

    const adjustedBoardSpecs = Object.assign({}, board, {
      x: board.x + topLeft.x,
      y: board.y + topLeft.y,
    });

    const testModule = Object.assign({}, testModuleCoordinates, draggingModule);
    const isNewModuleWithinBounds = checkCollision([testModule, adjustedBoardSpecs]).length > 0;

    if (isNewModuleWithinBounds && isDraggingToBoard) {
      const adjustedModuleCoordinates = this.getNewModuleCoordinates(coordinateData);
      const newModule = Object.assign({}, adjustedModuleCoordinates, draggingModule);

      store.dispatch(actions.pushToactiveModules(newModule));
    }

    this.timeOut = setTimeout(() => store.dispatch(actions.toggleIsMouseDownOnIcon(false)), 1);
    this.setState({ isDraggingToBoard: false });
  }

  getOnboardModalHandlers(tutorialStep) {
    const getButtonMethods = () => {
      switch (tutorialStep) {
        case 0:
          const stepZeroRightButtonHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleTutorialIsActive());
          };
          const stepZeroLeftButtoHandler = function () {
            store.dispatch(actions.toggleModal());
            this.toggleDocumentationCard();
          };
          return {
            handleRightButtonClick: stepZeroRightButtonHandler,
            handleLeftButtonClick: stepZeroLeftButtoHandler.bind(this),
          };
        case 2:
          return {
            handleRightButtonClick: this.startTour.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 3:
          const stepThreeClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.updateDisabledIconExceptions([0]));
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepThreeClickHandler.bind(this),
            handleLeftButtonClick: this.startTour.bind(this),
            handleDidMount: this.addTooltip.bind(this, toolTips[0]),
          };
        case 5:
          return {
            handleRightButtonClick: this.restartTour.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 6:
          const stepThreeSixClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepThreeSixClickHandler.bind(this),
            handleLeftButtonClick: this.startTour.bind(this),
            handleDidMount: this.addTooltip.bind(this, toolTips[1]),
          };
        case 9:
          const stepNineClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
          };
          return {
            handleRightButtonClick: stepNineClickHandler.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
            handleDidUpdate: this.addTooltip.bind(this, toolTips[2]),
          };
        case 12:
          const stepTwelveClickHandler = function () {
            store.dispatch(actions.incrementTutorialStep());
            store.dispatch(actions.toggleModal());
            store.dispatch(actions.updateShouldRenderTodoList(true));
          };
          return {
            handleRightButtonClick: stepTwelveClickHandler.bind(this),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
        case 13:
          const stepThirteenClickHandler = function () {
            store.dispatch(actions.exitTutorial());
            this.toggleDocumentationCard();
          };
          return {
            handleRightButtonClick: stepThirteenClickHandler.bind(this),
          };

        default:
          return {
            handleRightButtonClick: () => store.dispatch(actions.incrementTutorialStep()),
            handleLeftButtonClick: () => store.dispatch(actions.decrementTutorialStep()),
          };
      }
    };

    const handleCloseFunction = function () {
      store.dispatch(actions.changeModalType('CONFIRM'));
    };

    const handleClose = {
      handleCloseButtonClick: handleCloseFunction.bind(this),
    };
    const buttonMethods = getButtonMethods(tutorialStep);
    const modalClass = { modalClass: `modal-step-${this.props.tutorialStep}` };
    return Object.assign(buttonMethods, handleClose, modalClass);
  }

  handleJoyrideCallback(result) {
    const { joyride } = this.props;

    if (result.type === 'step:before') {
      this.setState({ step: result.index });
    }

    if (result.type === 'finished') {
      store.dispatch(actions.incrementTutorialStep());
      store.dispatch(actions.toggleModal());
      this.setState({
        running: false,
        joyrideStep: 0,
        tourSteps: dependecyDemo,
      });
    }

    if (result.type === 'error:target_not_found') {
      this.setState({
        step: result.action === 'back' ? result.index - 1 : result.index + 1,
        autoStart: result.action !== 'close' && result.action !== 'esc',
      });
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback();
    }
  }

  handleKeyPress(evt) {
    const evtobj = window.event ? event : evt;

    if (evtobj.keyCode === 90 && evtobj.ctrlKey) {
      store.dispatch(actions.undo());
    }

    if (evtobj.keyCode === 89 && evtobj.ctrlKey) {
      store.dispatch(actions.redo());
    }
  }

  handleNameChange(newName) {
    const { activeProject } = this.props;

    store.dispatch(actions.updateEntity('Project', activeProject.id, {
      name: newName,
    }));
  }

  handleKeyUp(evt) {
    const evtobj = window.event ? event : evt;
    const { isMouseOverModule, hoveredModuleId } = this.props;

    if (isMouseOverModule && (evtobj.code === 'Delete' || evtobj.code === 'Backspace')) {
      store.dispatch(actions.deleteEntity('Module', hoveredModuleId));
    }
  }

  handleMouseDown(evt) {
    if (evt.which === 1) {
      store.dispatch(actions.toggleIsMouseDown(true));
    }
  }

  handleMouseUp(evt) {
    if ((evt.which === 1) && !this.state.shouldHideContextMenu) {
      this.toggleShouldHideContextMenu(true);
    }

    if ((evt.which === 3) && this.props.isMouseOverModule) {
      this.toggleShouldHideContextMenu(false);
    }

    if (this.state.isDraggingToBoard) {
      this.dropDraggingModule(evt);
    }

    store.dispatch(actions.toggleIsMouseDown(false));
  }

  handleRightButtonClick() {
    if (this.state.joyrideStep === 1) {
      this.joyride.next();
    }
  }

  hideFloatingElements() {
    if (!this.props.isMouseOverModule) {
      store.dispatch(actions.updateShouldRenderTodoList(false));
      this.setState({
        showDocumentation: false,
        showInfoButton: false,
      });
    }
  }

  showAllModuleIcons() {
    store.dispatch(actions.updateShowAllIcons(true));
  }

  toggleDocumentationCard() {
    const { showDocumentation, wasDocumentationOpen } = this.state;
    this.setState({
      showDocumentation: !showDocumentation,
      wasDocumentationOpen: !wasDocumentationOpen,
      tooltipHook: null,
    });
  }

  toggleNavMenu() {
    const { isNavMenuActive } = this.state;

    this.setState({ isNavMenuActive: !isNavMenuActive });
  }

  toggleDraggingToBoard() {
    this.setState({ isDraggingToBoard: true });
  }

  toggleShouldExportPDF() {
    const { shouldExportPDF } = this.state;
    this.setState({
      shouldExportPDF: !shouldExportPDF,
    });
  }

  toggleShouldHideContextMenu(boolean) {
    this.setState({
      shouldHideContextMenu: boolean,
    });
  }

  unhideFloatingElements() {
    const { wasDocumentationOpen } = this.state;
    const { isTutorialActive, tutorialStep } = this.props;

    if (isTutorialActive && tutorialStep === 13) {
      store.dispatch(actions.updateShouldRenderTodoList(true));
    }

    this.setState({
      showDocumentation: wasDocumentationOpen,
      showInfoButton: true,
    });
  }

  restartTour() {
    store.dispatch(actions.toggleModal());
    this.joyride.reset(true);
  }

  rotate() {
    const { hoveredModule, board, anchors } = this.props;
    const { topLeft } = anchors;

    store.dispatch(actions.rotateModule(hoveredModule, board, topLeft));
  }

  startTour() {
    store.dispatch(actions.toggleModal());
    this.setState({
      running: true,
      joyrideStep: 0,
    });
  }

  renderBoardFrame() {
    const { tutorialStep, board } = this.props;

    if (tutorialStep === 2) {
      return (
        <DesignToolBoardFrame
          width={board.width + 27}
          height={board.height + 27}
          top={board.y - 14}
          left={board.x - 14}
        />
      );
    }

    return null;
  }

  renderFooter() {
    const { activeModules } = this.props;

    if (this.state.showInfoButton) {
      return (
        <Footer
          modules={activeModules}
        />
      );
    }

    return null;
  }

  renderInfoButton() {
    const { showDocumentation } = this.state;
    const infoButtonIconClass = showDocumentation ? 'fa-close' : 'fa-question';

    const infoButtonIcon = (
      <FontAwesome
        className={infoButtonIconClass}
        name={infoButtonIconClass}
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    );

    return (
      <DesignToolInfoButton
        clickHandler={this.toggleDocumentationCard}
        icon={infoButtonIcon}
      />
    );
  }

  renderJoyride() {
    const { joyride } = this.props;

    const joyrideProps = {
      autoStart: true || joyride.autoStart || this.state.autoStart,
      callback: this.handleJoyrideCallback,
      debug: false,
      disableOverlay: true,
      resizeDebounce: joyride.resizeDebounce,
      run: this.state.running,
      scrollToFirstStep: joyride.scrollToFirstStep || true,
      stepIndex: 0,
      steps: this.state.tourSteps,
      type: 'continuous',
      locale: { next: 'Next', last: 'Next', back: 'Back' },
    };

    return (
      <Joyride
        {...joyrideProps}
        ref={node => (this.joyride = node)}
      />
    );
  }

  renderModal() {
    const { tutorialStep, showModal, modalType } = this.props;
    const { tutorialSteps } = this.state;

    if (showModal) {
      switch (modalType) {
        case 'ONBOARD':
          const onboardModalMethods = this.getOnboardModalHandlers(tutorialStep);
          const onboardModalProps = Object.assign(tutorialSteps[tutorialStep], onboardModalMethods);

          return (
            <Modal
              {...onboardModalProps}
            />
          );
        case 'CONFIRM':
          let rightButtonClick = function () {
            store.dispatch(actions.exitTutorial());
            this.toggleDocumentationCard();
          };
          rightButtonClick = rightButtonClick.bind(this);
          return (
            <Modal
              handleCloseButtonClick={() => store.dispatch(actions.exitTutorial())}
              handleLeftButtonClick={() => store.dispatch(actions.resumeTutorial())}
              handleRightButtonClick={rightButtonClick}
              leftButtonText="Go Back"
              modalClass="confirm-exit-tutorial"
              rightButtonText="Exit"
              showLeftButton
              text="Are you sure you want to exit the tutorial?"
            />
          );
        default:
          throw new Error('Unexpected modal type');
      }
    }

    return null;
  }

  renderSideBar() {
   const {
     activeModules,
     showAllIcons,
     clickedModuleIndex,
   } = this.props;

    const { isDraggingToBoard } = this.state;

    if (!isDraggingToBoard) {
      return (
        <SideBar
          activeModules={activeModules}
          showAllIcons={showAllIcons}
          clickedModuleIndex={clickedModuleIndex}
          activeModulesLength={activeModules.length}
          showAll={this.showAllModuleIcons}
          toggleDraggingToBoard={this.toggleDraggingToBoard}
        />
      );
    }

    return null;
  }

  renderTodo() {
    const { showTodoList, todoBools } = this.props;

    const handleLinkClick = () => {
      store.dispatch(actions.changeModalType('CONFIRM'));
      store.dispatch(actions.toggleModal());
    };

    if (showTodoList) {
      return (
        <DesignToolTodo
          handleLinkClick={handleLinkClick}
          todoBools={todoBools}
        />
      );
    }

    return null;
  }

  render() {
   const {
     activeProjectName,
     activeProjectId,
     showSavingMessage,
     stageRef,
     projects
   } = this.props;

    const {
      isDraggingToBoard,
      isNavMenuActive,
      shouldExportPDF,
      showDocumentation,
      showInfoButton,
      shouldHideContextMenu,
    } = this.state;

    return (
      <div>
        {this.renderJoyride()}
        {this.renderBoardFrame()}
        <TopNavbar
          handleExportButtonClick={this.toggleShouldExportPDF.bind(this)}
          handleNameChange={this.handleNameChange.bind(this)}
          handleHomeButtonClick={routeToHome}
          handleProjectsButtonClick={routeToProjects}
          handleMenuClick={this.toggleNavMenu}
          isNavMenuActive={isNavMenuActive}
          showSavingMessage={showSavingMessage}
          projectName={activeProjectName}
          updateLastSaved={this.updateLastSaved}
        />
        <div>
          <div ref={node => { this.stageContainer = node }}>
            {this.renderSideBar()}
            <DesignToolStage
              hideFloatingElements={this.hideFloatingElements}
              isDraggingToBoard={isDraggingToBoard}
              rotate={this.rotate}
              shouldExportPDF={shouldExportPDF}
              shouldHideContextMenu={shouldHideContextMenu}
              showBoard={Boolean(activeProjectId && (projects.length > 0))}
              stageRef={stageRef}
              toggleShouldExportPDF={this.toggleShouldExportPDF.bind(this)}
              unhideFloatingElements={this.unhideFloatingElements}
            />
          </div>
        </div>
        {this.renderFooter()}
        {showDocumentation && <DocumentationCard />}
        {showInfoButton && this.renderInfoButton()}
        {this.renderModal()}
        {this.renderTodo()}
      </div>
    );
  }
};

const mapStateToProps = state => ({
    activeModules: getActiveModules(state),
    activeProject: getActiveProject(state),
    activeProjectId: state.projects.activeProjectId,
    activeProjectName: getActiveProjectName(state),
    anchors: state.anchors,
    board: getActiveProjectBoard(state),
    clickedModuleIndex: state.modules.clickedIndex,
    draggingModule: state.modules.draggingModule,
    hoveredModuleId: state.modules.hoveredId,
    hoveredModule: getHoveredModule(state),
    isFetching: state.projects.isFetching,
    isMouseOverModule: state.mouseEvents.isMouseOverModule,
    isTutorialActive: state.tutorial.isActive,
    modalType: state.modal.modalType,
    projects: getProjects(state),
    saveProjectTrigger: state.triggers.saveProjectTrigger,
    showModal: state.modal.showModal,
    showTodoList: state.tutorial.showTodoList,
    showAllIcons: state.sideBar.showAllIcons,
    showSavingMessage: state.nav.showSavingMessage,
    todoBools: state.tutorial.todoBools,
    topLeftAnchorX: state.anchors.topLeft.x,
    topLeftAnchorY: state.anchors.topLeft.y,
    tutorialStep: state.tutorial.step,
});

DesignTool = withRouter(DesignTool);
export default connect(mapStateToProps)(DesignTool);

DesignTool.propTypes = {
  anchors: PropTypes.object.isRequired,
  board: PropTypes.object,
  activeProjectId: PropTypes.string,
  activeModules: PropTypes.array.isRequired,
  showAllIcons: PropTypes.bool.isRequired,
  isMouseOverModule: PropTypes.bool.isRequired,
  isTutorialActive: PropTypes.bool.isRequired,
  joyride: PropTypes.object,
  location: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  hoveredModuleId: PropTypes.number,
  hoveredModule: PropTypes.object,
  showModal: PropTypes.bool.isRequired,
  showTodoList: PropTypes.bool.isRequired,
  todoBools: PropTypes.array.isRequired,
  tutorialStep: PropTypes.number.isRequired,
};

DesignTool.defaultProps = {
  activeProjectId: null,
  board: null,
  hoveredModule: null,
}
