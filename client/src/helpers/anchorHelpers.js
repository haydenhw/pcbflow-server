export const getAnchorPositions = ({ width, height}) => ({
  topLeft: {
    x: 0,
    y: 0,
  },
  topRight: {
    x: width,
    y: 0,
  },
  bottomLeft: {
    x: 0,
    y: height,
  },
  bottomRight: {
    x: width,
    y: height,
  },
});

export const addAnchorsToProject = project => {
  const { board } = project;

  return Object.assign({}, project, {
    anchors: getAnchorPositions(board),
  });
}
