// *refactor for readability
import { compose } from 'helpers/functional';

export function getUnsatisfiedModuleIds(modules = [], moduleDependencies) {
  const activeModuleIds = modules.map(module => module.dependencyId);
  const unmetDependencyIds = moduleDependencies.filter(dependencyId => activeModuleIds.indexOf(dependencyId) === -1);

  return unmetDependencyIds;
}

export function getUnmetDependencies(moduleList, activeModules, moduleDependencies) {
  const unmetDependencyIds = getUnsatisfiedModuleIds(activeModules, moduleDependencies);
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.dependencyId) !== -1)
  );

  return unmetDependencies;
}

export function getDependencyDiff(moduleArray) {
  const filterdArray = moduleArray.map((module, index) => {
    const { dependencyId, dependencies, text } = module;

    return {
      index,
      dependencyId,
      text,
      dependencies,
      metDependencies: [],
    };
  });

  filterdArray.forEach((module) => {
    const { dependencies, metDependencies, index } = module;

    filterdArray.forEach((otherModule) => {
      if (
        (dependencies.indexOf(otherModule.dependencyId) !== -1) &&
        (metDependencies.indexOf(otherModule.dependencyId) === -1)
      ) {
        metDependencies.push(otherModule.dependencyId);
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
