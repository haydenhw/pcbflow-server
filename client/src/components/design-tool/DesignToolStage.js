import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Board from 'components/board/Board';
import ModuleContainer from 'components/modules/Modules';
import Grid from './DesignToolGrid';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';
import generateThumbnail from 'helpers/generateThumbnail';

import assert from 'assert';

class DesignToolStage extends Component {

  updateThumbnail() {
    const boardLayer = this.refs.stage.getStage().get('.boardLayer')[0];
    const thumbnail = generateThumbnail(boardLayer);

    store.dispatch(actions.updateBoardThumbnail(thumbnail));
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.shouldUpdateThumbnail && !this.props.shouldUpdateThumbnail) {
      this.updateThumbnail();
      this.props.toggleShouldUpadateThumbnail();
    }
  }

  deleteModule() {
    const promise = new Promise((resolve, reject) => {
      store.dispatch(actions.deleteSelectedModule(this.props.selectedModuleIndex));
      resolve();
    });
    
    promise.then(() => {
      const moduleArray = this.refs.stage.getStage().get('.moduleGroup')
      if (moduleArray.length) {
        moduleArray.splice(this.props.selectedModuleIndex, 1)
        const module = moduleArray[0];
        module.attrs.highlightRuleBreakingModules(moduleArray, this.props.selectedModuleIndex);
      }
    })
  }

  
  render() {
    
    const {
      shouldRenderBoard,
      draggingModule,
      isMouseDownOnIcon,
      isMouseDown,
      isMouseOverModule,
      rotate,
      hideDocumentation,
      unhideDocumentation,
     } = this.props;
     
    const board = (
        <Board 
        rotate={rotate} 
        hideDocumentation={hideDocumentation}
        unhideDocumentation={unhideDocumentation}
      />
    )
     
    return (
      <div>
        <ContextMenuTrigger
          id={'SIMPLE'}
          name={'rect'}
          disable={!(!isMouseDown && isMouseOverModule)}
          holdToDisplay={1000}
        >
          <div>
            <Stage
              ref="stage"
              width={2000}
              height={1000}
            >
              <Grid gridWidth={5000} cellWidth={20} />
              {shouldRenderBoard ? board  : <Layer />}
              {isMouseDownOnIcon ? <Layer>{ draggingModule }</Layer> : <Layer /> }
            </Stage>
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={'SIMPLE'}>
          <MenuItem onClick={this.deleteModule.bind(this)}>delete</MenuItem>
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

