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

import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';

class DesignToolStage extends Component {
  constructor() {
    super();
    this.deleteModule = this.deleteModule.bind(this);
  }
  
  updateThumbnail() {
    const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
    const thumbnail = generateThumbnail(boardLayer);

    store.dispatch(actions.updateBoardThumbnail(thumbnail));
  }
  
  downloadPDF() {
    const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
    const croppedStage = getCroppedStage(boardLayer)
    const imageDataURL = croppedStage.node.toDataURL("image/jpeg", 1.0)
    
    const pxPerMillimeter = 0.2458333;
    const imageOffsetX = (1125 
      - croppedStage.width) / 2 * pxPerMillimeter * 1.02525;
    const imageOffsetY = (795 - croppedStage.height) / 2 * pxPerMillimeter * 0.995;
    
    const pdf = new jsPDF("landscape");
    pdf.addImage(imageDataURL, 'JPEG', imageOffsetX, imageOffsetY);
    pdf.save('test.pdf');
  }

  componentWillReceiveProps(nextProps) {
    const { toggleShouldUpadateThumbnail , toggleShouldExportPDF } = this.props;
  
    if (nextProps.shouldUpdateThumbnail && !this.props.shouldUpdateThumbnail) {
      this.updateThumbnail();
      toggleShouldUpadateThumbnail();
    }
    
    if (nextProps.shouldExportPDF && !this.props.shouldExportPDF) {
      this.downloadPDF()
      toggleShouldExportPDF();
    }
  }

  deleteModule() {
    const { selectedModuleIndex } = this.props;
    store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
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
              ref="stage"
              width={2000}
              height={1000}
            >
              <Grid gridWidth={5000} cellWidth={20} />
              {shouldRenderBoard ? board : <Layer />}
              {isMouseDownOnIcon ? <Layer>{ draggingModule }</Layer> : <Layer /> }
            </Stage>
          </div>
        </ContextMenuTrigger>

        <ContextMenu
          id={'SIMPLE'}
          className={contextMenuClass}
        >
          <MenuItem onClick={this.deleteModule}>delete</MenuItem>
          <MenuItem onClick={rotate}>rotate</MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  isMouseDown: state.mouseEvents.isMouseDown,
  selectedModuleIndex: state.selectedModule.index,
  selectedModuleProps: state.selectedModule,
  boardSpecs: state.boardSpecs,
  anchorPositions: state.anchorPositions,
});

export default connect(mapStateToProps)(DesignToolStage);

DesignToolStage.propTypes = {
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
