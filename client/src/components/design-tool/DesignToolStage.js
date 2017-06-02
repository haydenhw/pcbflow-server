import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
// import jsPDF from 'jspdf';
import { Layer, Stage } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail, { getScaledStage } from 'helpers/generateThumbnail';

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
  
  downloadePDF() {
    //pdf is 
    const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
    const imageData = getScaledStage(boardLayer).toDataURL("image/jpeg", 1.0)
    const pdf = new jsPDF("landscape");

    pdf.addImage(imageData, 'JPEG', 0, 50);
    pdf.save('test.pdf');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateThumbnail && !this.props.shouldUpdateThumbnail) {
      this.updateThumbnail();
      this.props.toggleShouldUpadateThumbnail();
    }
    
    if (nextProps.shouldExportPDF && !this.props.shouldExportPDF) {
      this.downloadePDF()
      this.props.toggleShouldExportPDF();
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
