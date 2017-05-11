import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';


export function getDependencyDiff(moduleArray) {
  const changedElements = [];
  
  const filterdArray = moduleArray.map((module, index) => {
    const { id, dependencies, metDependencies } = module;
    return {
      index,
      id,
      dependencies,
      metDependencies: metDependencies || []
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
        changedElements.push(index);
      }
    });
  });
   
  return filterdArray.filter(element => changedElements.indexOf(element.index) !== -1);
}

export function updateMetDependencies(dependencyDiffArray) {
  
   const dispatchMetDependencies = metDependencies  => {
     store.dispatch(actions.updateMetDependencies(metDependencies));
   };
   
   function setDelay(metDependencies) {
     setTimeout(function(){
       dispatchMetDependencies(metDependencies);
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