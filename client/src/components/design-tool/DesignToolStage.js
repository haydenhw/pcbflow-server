import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Konva from 'konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Layer, Stage } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import { getActiveProject, getActiveProjectBoard } from '../../selectors/projectSelectors';
import { getActiveModules } from '../../selectors/moduleSelectors';

import { getStroke } from 'helpers/boardHelpers';
import { getCroppedStage } from 'helpers/generateThumbnail';

import Board from 'components/board/Board';
import Grid from './DesignToolGrid';

const getModuleGroup = ({ moduleX, moduleY }) => new Konva.Group({
  x: moduleX,
  y: moduleY,
});

const getModuleImage = ({ imageX , imageY, imageWidth, imageHeight, image }) =>  new Konva.Image({
  image,
  x: imageX,
  y: imageY,
  width: imageWidth,
  height: imageHeight,
});

const getModuleOutline = ({ x , y, width, height, defaultStroke }) => new Konva.Image({
  width,
  height,
  stroke: defaultStroke,
});

const getModule = (getGroup) => (children) => (moduleData) => {
  const group = getGroup(moduleData);
  children.forEach(getChild => {
    group.add(getChild(moduleData));
  });

  return group;
}

const toArray = (...args) => args;
const moduleChildren = toArray(getModuleImage, getModuleOutline);
const getDragModule = getModule(getModuleGroup)(moduleChildren);

const addPropToData = data => newProp => Object.assign({}, data , newProp);

// *move to helpers file
const getWindowDimensions = () => ({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
});

class DesignToolStage extends Component {
  constructor() {
    super();
    this.state = getWindowDimensions();

    this.deleteModule = this.deleteModule.bind(this);
  }

  setWindowDimensions = () => {
    this.setState(getWindowDimensions());
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    const { toggleShouldExportPDF } = this.props;

    if (nextProps.shouldExportPDF && !this.props.shouldExportPDF) {
      this.downloadPDF();
      toggleShouldExportPDF();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isDraggingToBoard && !prevProps.isDraggingToBoard) {
      this.renderDragModule();
    }

    if (!this.props.isDraggingToBoard && prevProps.isDraggingToBoard) {
      this.removeDragModule();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowDimensions);
  }

  downloadPDF() {
    // *move to action creator
    const boardLayer = this.stage.getStage().get('.boardLayer')[0];
    const croppedStage = getCroppedStage(boardLayer);
    const imageDataURL = croppedStage.node.toDataURL('image/jpeg', 1.0);

    const pxPerMillimeter = 0.2458333;
    const imageOffsetX = (1125 - croppedStage.width) / 2 * pxPerMillimeter * 1.02525;
    const imageOffsetY = (795 - croppedStage.height) / 2 * pxPerMillimeter * 0.995;
    const textOffsetY = 795 * pxPerMillimeter + 5;
    const pdf = new jsPDF('landscape');

    pdf.setFontSize(8),
    pdf.text(footerText, 10, textOffsetY);
    pdf.addImage(imageDataURL, 'JPEG', imageOffsetX, imageOffsetY);
    pdf.save('test.pdf');
  }

  deleteModule() {
    const { hoveredModuleId } = this.props;

    store.dispatch(actions.deleteEntity('Module', hoveredModuleId));
  }

  renderDragModule() {
    const { draggingModule } = this.props;
    const { width, height } =  draggingModule;
    const stage = this.stage.getStage();
    const layer = new Konva.Layer({ name: 'dragModuleLayer' });
    const imageObj = new Image();

    imageObj.src = draggingModule.imageSrc;
    imageObj.onload = function() {
      const updatedModuleData = addPropToData(draggingModule)({ image: imageObj });
      const dragModule = getDragModule(updatedModuleData);

      layer.add(dragModule);
      stage.add(layer);

      document.addEventListener('mousemove', (evt) => {
        const { clientX, clientY } = evt;

        dragModule.setX(clientX - (width / 2));
        dragModule.setY(clientY - (height / 2));
        layer.draw();
      });
    }
  }

  removeDragModule() {
    const stage = this.stage.getStage();
    const dragModuleLayer = stage.get('.dragModuleLayer')[0];

    if (dragModuleLayer) {
      setTimeout(() => dragModuleLayer.destroy(), 0);
    }
  }



  render() {
    const {
      activeProject,
      anchors,
      board,
      hideFloatingElements,
      isDraggingToBoard,
      isMouseDown,
      isMouseOverModule,
      modules,
      rotate,
      shouldHideContextMenu,
      showBoard,
      unhideFloatingElements,
     } = this.props;

    const contextMenuClass = shouldHideContextMenu ? 'hideContextMenu' : 'react-contextmenu';

    return (
      <div>
        <ContextMenuTrigger
          id='SIMPLE'
          name='rect'
          disable={isMouseDown || !isMouseOverModule}
        >
          <div>
            <Stage
              ref={node => { this.stage = node; }}
              name="stage"
              width={this.state.width}
              height={this.state.height}
            >
              <Grid gridRef={node => { this.grid = node }} gridWidth={2000} gridHeight={2000} cellWidth={20} />
              {showBoard
                ? <Board
                    activeProject={activeProject}
                    rotate={rotate}
                    hideFloatingElements={hideFloatingElements}
                    unhideFloatingElements={unhideFloatingElements}
                    isDraggingToBoard={isDraggingToBoard}
                    stroke={getStroke(modules, board, anchors.topLeft)}
                  />
                : <Layer />}
            </Stage>
          </div>
        </ContextMenuTrigger>
        <ContextMenu
          id='SIMPLE'
          className={contextMenuClass}
        >
          <MenuItem onClick={this.deleteModule}>delete</MenuItem>
          <MenuItem onClick={rotate}>rotate</MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    activeProjectId: state.projects.activeProjectId,
    activeProject: getActiveProject(state),
    board: getActiveProjectBoard(state),
    draggingModule: state.modules.draggingModule,
    isMouseDownOnIcon: state.mouseEvents.isMouseDownOnIcon,
    isMouseOverModule: state.mouseEvents.isMouseOverModule,
    isMouseDown: state.mouseEvents.isMouseDown,
    modules: getActiveModules(state),
    hoveredModuleId: state.modules.hoveredId,
    anchors: state.anchors,
  });
};

export default connect(mapStateToProps)(DesignToolStage);

DesignToolStage.propTypes = {
  activeProjectName: PropTypes.string,
  showBoard: PropTypes.bool.isRequired,
  isMouseDownOnIcon: PropTypes.bool.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  isMouseOverModule: PropTypes.bool.isRequired,
  rotate: PropTypes.func.isRequired,
  hideFloatingElements: PropTypes.func.isRequired,
  unhideFloatingElements: PropTypes.func.isRequired,
  shouldHideContextMenu: PropTypes.bool.isRequired,
  isDraggingToBoard: PropTypes.bool.isRequired,
  anchors: PropTypes.object.isRequired,
  hoveredModuleId: PropTypes.number,
};

DesignToolStage.defaultProps = {
  hoveredModuleId: null,
}
