import { getOutOfBoundModules } from 'helpers/getRuleBreakingModules';

export const getStroke = (modules, board, topLeftAnchor) => {
    const outOfBoundsModules = getOutOfBoundModules(modules, board, topLeftAnchor);
    return outOfBoundsModules.length > 0 ? 'red': null;
  }
