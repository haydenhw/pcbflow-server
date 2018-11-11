import { getOutOfBoundModules } from 'helpers/getRuleBreakingModules';

export const getStroke = (modules, board) => {
    const outOfBoundsModules = getOutOfBoundModules(modules, board);
    return outOfBoundsModules.length > 0 ? 'red': null;
  }
