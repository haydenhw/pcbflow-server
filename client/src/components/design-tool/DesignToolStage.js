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
import { getModulesObject } from 'helpers/printModuleNames';
import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';

class DesignToolStage extends Component {
  constructor() {
    super();
    this.state = {
      serializedModules:  null
    }

    this.deleteModule = this.deleteModule.bind(this);
  }

  updateThumbnail() {
    console.log('updatingThumnail')
    if (this.refs) {
      const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
      const thumbnail = generateThumbnail(boardLayer);
      store.dispatch(actions.updateBoardThumbnail(thumbnail));
    }
  }

  downloadPDF() {
    const { currentProjectName } = this.props;
    const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
    const croppedStage = getCroppedStage(boardLayer);
    const imageDataURL = croppedStage.node.toDataURL('image/jpeg', 1.0);
    const footerText = `${currentProjectName} created ${getTimeDateStamp()}`;

    const pxPerMillimeter = 0.2458333;
    const imageOffsetX = (1125
      - croppedStage.width) / 2 * pxPerMillimeter * 1.02525;
    const imageOffsetY = (795 - croppedStage.height) / 2 * pxPerMillimeter * 0.995;
    const textOffsetY = 795 * pxPerMillimeter + 5;

    const pdf = new jsPDF('landscape');
    pdf.setFontSize(8),
    pdf.text(footerText, 10, textOffsetY);
    pdf.addImage(imageDataURL, 'JPEG', imageOffsetX, imageOffsetY);
    pdf.save('test.pdf');
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    // const serializedModules = this.serializedModules(this.refs.stage);
    // if (prevState.serializedModules !== serializedModules) {
    //   this.setState({ serializedModules }, () => console.log(this.state))
    // }
      // this.setState({ serializedModules },() => console.log(this.state));
      // console.log(serializedModules)
    if (prevProps.updateThumbnailTrigger !== this.props.updateThumbnailTrigger) {
      const { modules } = this.props;
      // this.updateThumbnail();
      setTimeout(this.updateThumbnail.bind(this), 1000)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { boardSpecs, toggleShouldExportPDF } = this.props;

    // if (nextProps.shouldUpdateThumbnail && !this.props.shouldUpdateThumbnail) {
    //   this.updateThumbnail();
    // }

    if (nextProps.shouldExportPDF && !this.props.shouldExportPDF) {
      this.downloadPDF();
      toggleShouldExportPDF();
    }
  }

  deleteModule() {
    const { selectedModuleIndex } = this.props;
    store.dispatch(actions.deleteSelectedModule(selectedModuleIndex));
  }

  serializedModules(stageRef) {
    const jsonStage = stageRef.getStage().toJSON();
    const children = (JSON.parse(jsonStage).children[1].children[0]);
    const childrenClone = Object.assign({}, children);
    const keysLength = Object.keys(childrenClone).length;

    if (keysLength > 0) {
      const deeperChildren = childrenClone.children[5].children;
      const finalJSON = JSON.stringify(deeperChildren);
      return finalJSON;
    }
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

const mapStateToProps = state => {
  // console.log(state.boardSpecs);
  return ({
  currentProjectName: state.currentProjectInfo.name,
  isMouseDownOnIcon: state.mouseEvents.mouseDownOnIcon,
  isMouseOverModule: state.mouseEvents.isMouseOverModule,
  isMouseDown: state.mouseEvents.isMouseDown,
  selectedModuleIndex: state.selectedModule.index,
  selectedModuleProps: state.selectedModule,
  boardSpecs: state.boardSpecs,
  updateThumbnailTrigger: state.boardSpecs.updateThumbnailTrigger,
  anchorPositions: state.anchorPositions,
  modules: state.currentProjectModules.present,
})
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
