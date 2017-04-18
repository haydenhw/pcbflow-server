import React, { Component } from 'react';
import { Layer, Rect, Group } from 'react-konva';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Modules from 'components/modules/Modules';
import ModulesItem from 'components/modules/ModulesItem';
import Anchor from './BoardAnchor';

class Board extends Component {
  
  test(imgSrc, callback){
    var myImage = new Image();
    myImage.crossOrigin = "Anonymous";
    myImage.onload = function(){
        var imageData = removeImageBlanks(myImage); //Will return cropped image data
        console.log(callback)
        callback(imageData)
    }
    myImage.src = imgSrc;

    //-----------------------------------------//
    function removeImageBlanks(imageObject) {
        const imgWidth = imageObject.width;
        const imgHeight = imageObject.height;
        
        var canvas = document.createElement('canvas');
        canvas.setAttribute("width", imgWidth);
        canvas.setAttribute("height", imgHeight);
        var context = canvas.getContext('2d');
        context.drawImage(imageObject, 0, 0);

        var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
            data = imageData.data,
            getRBG = function(x, y) {
                var offset = imgWidth * y + x;
                return {
                    red:     data[offset * 4],
                    green:   data[offset * 4 + 1],
                    blue:    data[offset * 4 + 2],
                    opacity: data[offset * 4 + 3]
                };
            },
            isWhite = function (rgb) {
                // many images contain noise, as the white is not a pure #fff white
                return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
            },
            scanY = function (fromTop) {
                var offset = fromTop ? 1 : -1;

                // loop through each row
                for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

                    // loop through each column
                    for(var x = 0; x < imgWidth; x++) {
                        var rgb = getRBG(x, y);
                        if (!isWhite(rgb)) {
                            return y;                        
                        }      
                    }
                }
                return null; // all image is white
            },
            scanX = function (fromLeft) {
                var offset = fromLeft? 1 : -1;

                // loop through each column
                for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

                    // loop through each row
                    for(var y = 0; y < imgHeight; y++) {
                        var rgb = getRBG(x, y);
                        if (!isWhite(rgb)) {
                            return x;                        
                        }      
                    }
                }
                return null; // all image is white
            };

        var cropTop = scanY(true),
            cropBottom = scanY(false),
            cropLeft = scanX(true),
            cropRight = scanX(false),
            cropWidth = cropRight - cropLeft + 10,
            cropHeight = cropBottom - cropTop + 10;

        canvas.setAttribute("width", cropWidth);
        canvas.setAttribute("height", cropHeight);
        // finally crop the guy
        canvas.getContext("2d").drawImage(imageObject,
            cropLeft, cropTop, cropWidth, cropHeight,
            0, 0, cropWidth, cropHeight);

        return canvas.toDataURL();
    }
  }
  
  componentDidMount() {
    console.log(this.props)
    const boardLayer = this.refs.boardLayer
    const url = boardLayer.toDataURL();
    this.test(url, this.props.updateState)
  }
  // improves performance
  reRender() {
    const layer = this.refs.boardGroup.getLayer();
    layer.draw();
  }
  
  updatePosition() {
    const boardGroup = this.refs.boardGroup;
    const x = boardGroup.getX();
    const y = boardGroup.getY();
  
    store.dispatch(actions.updateBoardPosition({
      x: x, 
      y: y
    }))
  }
  
  handleDragEnd() {
    this.updatePosition();
  }
  
  render() {
    const {
      x,
      y,
      width,
      height,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
     } 
     = this.props;
     
    return (
      <Layer ref="boardLayer">
        <Group
          ref="boardGroup"
          x={10}
          y={10}
          width={width}
          height={height}
          draggable="true" 
        
          onDragMove={this.reRender.bind(this)}
          onDragEnd={this.handleDragEnd.bind(this)}
          >
      
          <Rect
            ref="board"
            name={"board"}
            x={topLeft.x}
            y={topLeft.y}
            width={topRight.x - topLeft.x || width}
            height={bottomLeft.y - topLeft.y || height }
            fill="#e3e3e5"
            opacity="0.5"
            stroke="#ccc"
          />
            
          <Anchor x={topLeft.x} y={topLeft.y} name={"topLeft"} />
          <Anchor x={topRight.x || width} y={topRight.y} name={"topRight"} />
          <Anchor x={bottomLeft.x} y={bottomLeft.y || height} name={"bottomLeft"} />
          <Anchor x={bottomRight.x || width} y={bottomRight.y ||height} name={"bottomRight"} />
          
          <Modules />
        </Group>
      </Layer>
      );
  }
}

const mapStateToProps = (state) => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  topLeft: state.anchorPositions.topLeft,
  topRight: state.anchorPositions.topRight,
  bottomLeft: state.anchorPositions.bottomLeft,
  bottomRight: state.anchorPositions.bottomRight
});

export default connect(mapStateToProps)(Board);