import React from 'react';
import Konva from 'konva';

import { createTempContainer } from 'helpers/generateThumbnail';

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
      var rect = new Konva.Rect({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
      });

      // add the shape to the layer
      layer.add(rect);
      // add the layer to the stage
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
