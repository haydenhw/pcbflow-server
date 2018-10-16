import React from 'react';
import Konva from 'konva';
import { project } from './Test.data.js';
import { createTempContainer } from 'helpers/generateThumbnail';
import { getAnchorPositions } from 'helpers/anchorHelpers';
import { boardStyles, anchorStyles } from '../constants/styleConstants';

const getKonvaElement = (type) => (varAttrs, styles={}) => (
  new Konva[type](Object.assign({}, styles, varAttrs))
);

const getBoardGroup = () => getKonvaElement('Group')({ x: 200, y: 300 });

const getBoard= ({ width, height }, styles) =>  (
  getKonvaElement('Rect')({ width, height }, styles)
);

const getAnchor = ({ x , y }, styles) =>  (
  getKonvaElement('Circle')({ x , y }, styles)
);

const getStageDataUrl = () => {
  var width = window.innerWidth;
  var height = window.innerHeight;

     const tempContainer = createTempContainer();
      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      });
      document.body.removeChild(tempContainer);

      var layer = new Konva.Layer();

      const { board: boardAttrs } = project;

      const boardGroup = getBoardGroup(boardAttrs);
      const board = getBoard(boardAttrs, boardStyles);

      const anchorPositions = getAnchorPositions(boardAttrs)

      boardGroup.add(board);

      Object.keys(anchorPositions).forEach(key => {
        const anchor = getAnchor(anchorPositions[key], anchorStyles);
        boardGroup.add(anchor)
      });

      layer.add(boardGroup);
      stage.add(layer);
      return stage.toDataURL();
}

export default class Test extends React.Component {

  render() {
    return (
      <div>
        <img src={getStageDataUrl()} alt=""/>
      </div>
    );
  }
}
