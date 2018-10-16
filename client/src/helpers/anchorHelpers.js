export const getAnchors = (x , y, width, height) => ({
  topLeft: {
    x,
    y,
  },
  topRight: {
    x: x + width,
    y: y,
  },
  bottomLeft: {
    x: x,
    y: y + height,
  },
  bottomRight: {
    x: x + width,
    y: y + height,
  },
});

export const addAnchorsToProject = project => {
  const { board } = project;
  const { x, y, width, height } = board;

  return Object.assign({}, project, {
    anchors: getAnchors(x, y, width, height),
  });
}
