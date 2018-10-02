// *refactor for readability
import { compose } from 'helpers/functional';

export function getUnsatisfiedModuleIds(modules = [], moduleDependencies) {
  const activeModuleIds = modules.map(module => module.id);
  const unmetDependencyIds = moduleDependencies.filter(id => activeModuleIds.indexOf(id) === -1);

  return unmetDependencyIds;
}

export function getUnmetDependencies(moduleList, activeModules, moduleDependencies) {
  const unmetDependencyIds = getUnsatisfiedModuleIds(activeModules, moduleDependencies);
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.id) !== -1)
  );

  return unmetDependencies;
}

export function getDependencyDiff(moduleArray) {
  const filterdArray = moduleArray.map((module, index) => {
    const { id, dependencies, text } = module;

    return {
      index,
      id,
      text,
      dependencies,
      metDependencies: [],
    };
  });

  filterdArray.forEach((module) => {
    const { dependencies, metDependencies, index } = module;

    filterdArray.forEach((otherModule) => {
      if (
        (dependencies.indexOf(otherModule.id) !== -1) &&
        (metDependencies.indexOf(otherModule.id) === -1)
      ) {
        metDependencies.push(otherModule.id);
      }
    });
  });

  return filterdArray;
}

export function areDependenciesMet(dependencies, metDependencies) {
  return dependencies ? (dependencies.length === metDependencies.length) : true;
}

export function findUnsatisfiedModule(dependencyDiffArray) {
  return dependencyDiffArray.find(element => (
    !areDependenciesMet(element.dependencies, element.metDependencies)
  ));
}

export const findNextUnsatisfiedModule = compose(findUnsatisfiedModule, getDependencyDiff);

export function getNewDependencyData(modules) {
  const dependencyDiffArray = getDependencyDiff(modules);
  const nextParentToDisplay = findUnsatisfiedModule(dependencyDiffArray);

  const nullData = {
    dependencies: [],
    index: null,
    text: null,
    moduleName: null,
  };

  if (nextParentToDisplay) {
    return {
      visibilityMode: 'DEPENDENCY',
      dependencyData: nextParentToDisplay,
    };
  }

  return {
    visibilityMode: 'ALL',
    dependencyData: nullData,
  };
}
