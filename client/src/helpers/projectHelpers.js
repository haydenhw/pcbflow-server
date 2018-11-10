const getOriginAdjustedModules = (modules, originX, originY) => (
  modules.map((module) => {
    const x = module.x - originX;
    const y = module.y - originY;

    return Object.assign({}, module, { x, y });
  })
);

export const getOriginAdjustedProjectData = (activeProject, anchors) => {
  const {
    board,
    name,
    activeModules,
  } = activeProject;

  const { width, height, x, y } = board;
  const { topLeft } = anchors;
  const { x: originX, y: originY } = topLeft;

  return {
    name,
    board: {
      width,
      height,
      x: x + originX,
      y: y + originY,
    },
    modules: getOriginAdjustedModules(activeModules, originX, originY),
  };
};
