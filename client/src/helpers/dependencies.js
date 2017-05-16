import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';


export function getUnmetDependencyIds(modules=[], selectedModuleDependencies) {
  const onBoardIds = modules.map((module) => module.id);
  const unmetDependencyIds = selectedModuleDependencies.filter((id) => onBoardIds.indexOf(id) === -1);

  return unmetDependencyIds;
}

export function getUnmetDependencies(moduleList, onBoardModules, selectedModuleDependencies) {
  const unmetDependencyIds = getUnmetDependencyIds(onBoardModules, selectedModuleDependencies)
  const unmetDependencies = (
    moduleList.filter(module => unmetDependencyIds.indexOf(module.id) !== -1)
  );
  
  if (unmetDependencies.length === 0) {
    return moduleList;
  }
  
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
      metDependencies: []
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
  
  return filterdArray
}

export function updateMetDependencies(dependencyDiffArray) {
  
   const dispatchMetDependencies = metDependencyData  => {
     store.dispatch(actions.updateMetDependencies(metDependencyData));
   };
   
   function setDelay(metDependencyData) {
     setTimeout(function(){
       dispatchMetDependencies(metDependencyData);
     }, 1);
   }
   
  dependencyDiffArray.forEach(element => {
    const { metDependencies, index } = element;
    
    setDelay({
      metDependencies,
      index
    });
  });
}

export function updateCurrentDependency() {
  
}