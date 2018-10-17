import React from 'react';
import Konva from 'konva';
import { project, modules } from './Test.data.js';
import { createTempContainer } from 'helpers/generateThumbnail';
import { getAnchorPositions } from 'helpers/anchorHelpers';
import { boardStyles, anchorStyles } from '../constants/styleConstants';

const getKonvaElement = (type) => (varAttrs, styles={}) => (
  new Konva[type](Object.assign({}, styles, varAttrs))
);

const getBoardGroup = () => getKonvaElement('Group')({ x: 200, y: 300 });

const getBoard = ({ width, height }, styles) =>  (
  getKonvaElement('Rect')({ width, height }, styles)
);

const getAnchor = ({ x , y }, styles) =>  (
  getKonvaElement('Circle')({ x , y }, styles)
);

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

const getModuleOutline = ({ x , y, width, height, stroke }) => new Konva.Image({
  width,
  height,
  stroke,
});

const getModule = (childrenGetters) => (moduleData) => {
  const group = getModuleGroup(moduleData);
  childrenGetters.forEach(getChild => {
    group.add(getChild(moduleData));
  });

  return group;
}

const toArray = (...args) => args;
const moduleChildrenGetters = toArray(getModuleImage, getModuleOutline);
const getDragModule = getModule(moduleChildrenGetters);

const getStageDataUrl = () => {
  var width = window.innerWidth;
  var height = window.innerHeight;

     // const tempContainer = createTempContainer();
      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      });
      // document.body.removeChild(tempContainer);

      var layer = new Konva.Layer();

      const { board: boardAttrs } = project;

      const boardGroup = getBoardGroup(boardAttrs);
      const board = getBoard(boardAttrs, boardStyles);
      const anchorPositions = getAnchorPositions(boardAttrs)

      const imageObj = new Image();
      const moduleData = modules[1];

      imageObj.onload = () => {
        const moduleImageData = Object.assign({}, moduleData, { image: imageObj })
        const module = getModule(moduleChildrenGetters)(moduleImageData);

        boardGroup.add(board);
        boardGroup.add(module);

        Object.keys(anchorPositions).forEach(key => {
          const anchor = getAnchor(anchorPositions[key], anchorStyles);
          boardGroup.add(anchor)
        });

        layer.add(boardGroup);
        stage.add(layer);
        // return stage.toDataURL();
      }

      imageObj.src = moduleData.imageSrc;
}

export default class Test extends React.Component {

  componentDidMount() {
    getStageDataUrl();
  }

  render() {
    return (
      <div id="container">
        {/* <img src={getStageDataUrl()} alt=""/> */}
      </div>
    );
  }
}
