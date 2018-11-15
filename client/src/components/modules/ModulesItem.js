import React, { PureComponent } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';
import PropTypes from 'prop-types';

import * as actions from 'actions/indexActions';
import store from 'store/store';

import { compose } from 'helpers/functional';
import { getKonvaChildByIndex, getKonvaParentByName} from 'helpers/konvaHelpers';
import { getFill, getX, getY } from 'helpers/moduleHelpers';
import bindToPerimeter from 'helpers/bindToPerimeter';

const getTopLeftAnchor = compose(
  getKonvaChildByIndex(1),
  getKonvaParentByName('boardGroup'),
);

export default class ModulesItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      strokeWidth: 1,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isDragging && nextState.isDragging) {
      return false;
    }

    return true;
  }

  setImage() {
    const { imageSrc, id, index } = this.props;

    if (imageSrc) {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        store.dispatch(actions.updateEntity('Module', id, {
          index,
          imageNode: image,
        }));
      };
    }
  }

  componentDidMount() {
    this.setImage();
  }

  getNewPosition() {
    const { board } = this.props;
    const  { moduleGroup } = this.refs;
    const topLeftAnchor = getTopLeftAnchor(moduleGroup);

    const updatedModule = Object.assign({}, this.props, {
      x: moduleGroup.getX(),
      y: moduleGroup.getY(),
    });

    const newPosition = bindToPerimeter(updatedModule, topLeftAnchor.attrs, board)

    return newPosition;
  }

  handleDragMove() {
    const { boundToSideIndex } = this.props;
    const { moduleGroup } = this.refs;

    if (isNaN(boundToSideIndex)) {
      return;
    }

    const newPosition = this.getNewPosition();

    moduleGroup.setX(newPosition.x);
    moduleGroup.setY(newPosition.y);
  }

  handleDragStart() {
    this.setState({ isDragging: true });
  }

  handleDragEnd() {
    const { id } = this.props;

    const newPosition = this.getNewPosition();

    store.dispatch(actions.updateEntity('Module', id, newPosition));
    this.setState({ isDragging: false });
  }

  handleMouseOver() {
    const { id } = this.props;
    this.setState({
      strokeWidth: 1.5,
    });

    store.dispatch(actions.updateHoveredModule(id));
    store.dispatch(actions.toggleIsMouseOverModule(true));
  }

  handleMouseOut() {
    this.setState({
      strokeWidth: 1,
    });

    document.body.style.cursor = 'default';
    store.dispatch(actions.toggleIsMouseOverModule(false));
  }

  handleClick(evt) {
    const { index } = this.props;
    if (evt.evt.which === 1) {
      store.dispatch(actions.updateClickedModuleIndex(index));
    }
  }

  handleDoubleClick() {
    const { topLeftAnchor, board } = this.props;

    store.dispatch(actions.rotateModule(this.props, board, topLeftAnchor));
  }

  renderImage() {
   const {
     imageX,
     imageY,
     imageHeight,
     imageWidth,
     imageNode,
     imageSrc,
   } = this.props;

    return (
      <Image
        x={imageX}
        y={imageY}
        height={imageHeight}
        width={imageWidth}
        image={imageNode}
        src={imageSrc}
        name="image"
      />
    );
  }


  render() {
    const { unmetDependencies } = this.props;
    const { moduleGroup } = this.refs;

    // *removing the (isDraggingToBoard === false) part of the fixed a bug where sidebound modules jumped while a module was being dragged from sidebar
    // const topLeftAnchor = moduleGroup && (isDraggingToBoard === false)
    // Note: isDraggingToBoard was removed from props

    const topLeftAnchor = moduleGroup
      ? getTopLeftAnchor(moduleGroup)
      : null;

    return (
      <Group
        draggable="true"
        ref="moduleGroup"
        name="moduleGroup"
        x={getX(this.props, topLeftAnchor)}
        y={getY(this.props, topLeftAnchor)}
        height={this.props.height}
        width={this.props.width}
        onDragStart={this.handleDragStart.bind(this)}
        onDragEnd={this.handleDragEnd.bind(this)}
        onDragMove={this.handleDragMove.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
      >
        <Text
          ref="text"
          x={this.props.textX}
          y={this.props.textY}
          width={this.props.width}
          text={this.props.text}
          fontSize={this.props.fontSize}
          fontFamily={this.props.fontFamily}
        />
        <Group
          ref="innerGroup"
          name="innerGroup"
          x={this.props.innerGroupX}
          y={this.props.innerGroupY}
          rotation={this.props.rotation}
          onClick={this.handleClick.bind(this)}
          onDblClick={this.handleDoubleClick.bind(this)}
        >
          <Rect
            ref="topLayer"
            width={this.props.width}
            height={this.props.height}
            fill={getFill(unmetDependencies)}
            opacity={this.props.opacity}
          />
          <Rect
            name="moduleBorder"
            ref="moduleBorder"
            width={this.props.width}
            height={this.props.height}
            stroke={this.props.stroke}
            strokeWidth={this.state.strokeWidth}
          />
          {this.props.imageSrc ? this.renderImage() : <Group />}
        </Group>
      </Group>
    );
  }
}

ModulesItem.defaultProps = {
  unmetDependencies: [],
};

ModulesItem.propTypes = {
  board: PropTypes.object.isRequired,
  boundToSideIndex: PropTypes.number,
  fill: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  imageNode: PropTypes.object,
  imageSrc: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageX: PropTypes.number.isRequired,
  imageY: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  innerGroupX: PropTypes.number.isRequired,
  innerGroupY: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  textX: PropTypes.number.isRequired,
  textY: PropTypes.number.isRequired,
  topLeftAnchor: PropTypes.object.isRequired,
  unmetDependencies: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

ModulesItem.defaultProps = {
  boundToSideIndex: null,
  id: null,
  imageNode: null,
}
