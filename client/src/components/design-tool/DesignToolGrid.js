import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Line } from 'react-konva';

export default function Grid(props) {
  const cellWidth = props.cellWidth;
  const gridWidth = props.gridWidth;
  const gridHeight = gridWidth;
  const gridLines = [];

  for (let i = 0; i <= gridWidth / cellWidth; i++) {
    gridLines.push(
      <Line
        key={`horz${i}`}
        points={[i * cellWidth, 0, i * cellWidth, gridHeight]}
        stroke="#ccc"
        strokeWidth=".5"
      />,
    );

    gridLines.push(
      <Line
        key={`vert${i}`}
        points={[0, i * cellWidth, gridWidth, i * cellWidth]}
        stroke="#ccc"
        strokeWidth=".5"
      />,
    );
  }

  return (
    <Layer>
      <Rect width={750} height={500} />
      {gridLines}
    </Layer>
  );
}

Grid.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  cellWidth: PropTypes.number.isRequired,
};
