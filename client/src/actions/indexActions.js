export * from './moduleActions';
export * from './boardActions';
export * from './projectActions';
export * from './mouseEventActions';
export * from './savedStateActions';

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  text
})

export const undo = () => ({
  type: 'UNDO'
  
})
