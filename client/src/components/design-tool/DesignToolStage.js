import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Layer, Stage } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail, { getCroppedStage } from 'helpers/generateThumbnail';
import { getTimeDateStamp } from 'helpers/getTimeStamp';

import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';

import { modulesData } from 'config/modulesData';

const getModuleGroup = ({ x, y }) => new Konva.Group({
  x,
  y,
});

const getModuleImage = ({ imageX , imageY, imageWidth, imageHeight, image }) =>  new Konva.Image({
  image,
  x: imageX,
  y: imageY,
  width: imageWidth,
  height: imageHeight,
});

const getModuleOutline = ({ x , y, width, height, stroke }) => new Konva.Image({
  x,
  y,
  width,
  height,
  stroke,
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

class DesignToolStage extends Component {
  constructor() {
    super();

    this.deleteModule = this.deleteModule.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { boardSpecs, toggleShouldExportPDF } = this.props;

    if (nextProps.updateThumbnailTrigger !== this.props.updateThumbnailTrigger) {
      console.log('hello from stage')
      setTimeout(this.updateThumbnail.bind(this), 0);
      // this.updateThumbnail()
    }

    if (nextProps.shouldExportPDF && !this.props.shouldExportPDF) {
      this.downloadPDF();
      toggleShouldExportPDF();
    }
  }

  componentDidMount() {
    // this.renderDragModule();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isDraggingToBoard && !prevProps.isDraggingToBoard) {
      this.renderDragModule();
    }

    if (!this.props.isDraggingToBoard && prevProps.isDraggingToBoard) {
      this.removeDragModule();
    }
  }

  downloadPDF() {
    // move to action creator
    const { currentProjectName } = this.props;
    const boardLayer = this.stage.getStage().get('.boardLayer')[0];
    const croppedStage = getCroppedStage(boardLayer);
    const imageDataURL = croppedStage.node.toDataURL('image/jpeg', 1.0);
    const footerText = `${currentProjectName} created ${getTimeDateStamp()}`;

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

  updateThumbnail() {
    // *move to action creator
    const { currentProjectId } = this.props;
    const boardLayer = this.stage.getStage().get('.boardLayer')[0];
    const thumbnail = generateThumbnail(boardLayer);
    store.dispatch(actions.updateBoardThumbnail(thumbnail, currentProjectId));
  }

  deleteModule() {
    const { selectedModuleIndex } = this.props;
    store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
  }

  renderDragModule() {
    const { dragModuleData } = this.props;
    const { width, height } =  dragModuleData;
    const stage = this.stage.getStage();
    const layer = new Konva.Layer({
      name: 'dragModuleLayer'
    });
    const imageObj = new Image();
    imageObj.src = dragModuleData.imageSrc;

    imageObj.onload = function() {
      const updatedModuleData = addPropToData(dragModuleData)({ image: imageObj });
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
    setTimeout(() => dragModuleLayer.destroy(), 0);
  }

  render() {
    const {
      shouldRenderBoard,
      draggingModule,
      isMouseDownOnIcon,
      isMouseDown,
      isMouseOverModule,
      rotate,
      hideFloatingElements,
      unhideFloatingElements,
      shouldHideContextMenu,
      isDraggingToBoard,
     } = this.props;

    const contextMenuClass = shouldHideContextMenu ? 'hideContextMenu' : 'react-contextmenu';

    const board = (
      <Board
        rotate={rotate}
        hideFloatingElements={hideFloatingElements}
        unhideFloatingElements={unhideFloatingElements}
        isDraggingToBoard={isDraggingToBoard}
      />
    );

    return (
      <div>
        <ContextMenuTrigger
          id={'SIMPLE'}
          name={'rect'}
          disable={isMouseDown || !isMouseOverModule}
        >
          <div>
            <Stage
              ref={node => { this.stage = node }}
              name="stage"
              width={document.documentElement.clientWidth}
              height={document.documentElement.clientHeight}
            >
              <Grid gridRef={node => { this.grid = node }} gridWidth={2000} gridHeight={2000} cellWidth={20} />
              {shouldRenderBoard ? board : <Layer />}
              {/* {isMouseDownOnIcon ? <Layer>{ draggingModule }</Layer> : <Layer /> } */}
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
    currentProjectName: state.currentProjectInfo.name,
    currentProjectId: state.currentProjectInfo.id,
    dragModuleData: state.draggingModule,
    isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
    isMouseOverModule: state.mouseEvents.isMouseOverModule,
    isMouseDown: state.mouseEvents.isMouseDown,
    selectedModuleIndex: state.selectedModule.index,
    selectedModuleProps: state.selectedModule,
    boardSpecs: state.boardSpecs,
    saveProjectTrigger: state.projects.saveProjectTrigger,
    updateThumbnailTrigger: state.boardSpecs.updateThumbnailTrigger,
    anchorPositions: state.anchorPositions,
    modules: state.currentProjectModules.present,
  });
};

export default connect(mapStateToProps)(DesignToolStage);

DesignToolStage.propTypes = {
  currentProjectName: PropTypes.string,
  shouldRenderBoard: PropTypes.bool.isRequired,
  draggingModule: PropTypes.object.isRequired,
  isMouseDownOnIcon: PropTypes.bool.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  isMouseOverModule: PropTypes.bool.isRequired,
  rotate: PropTypes.func.isRequired,
  hideFloatingElements: PropTypes.func.isRequired,
  unhideFloatingElements: PropTypes.func.isRequired,
  toggleShouldUpadateThumbnail: PropTypes.func.isRequired,
  shouldHideContextMenu: PropTypes.bool.isRequired,
  isDraggingToBoard: PropTypes.bool.isRequired,
  anchorPositions: PropTypes.object.isRequired,
  selectedModuleIndex: PropTypes.number,
  selectedModuleProps: PropTypes.object.isRequired,
  boardSpecs: PropTypes.object.isRequired,
};
