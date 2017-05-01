export default function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        if (previous && previous[previous.length - 1]) {
          console.log(previous[previous.length - 1].imageNode)
          console.log(past)
          console.log(present)
        }
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [ present, ...future ]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [ ...past, present ],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        console.log(present === newPresent, JSON.stringify(present) === JSON.stringify(newPresent), present, newPresent)
        // console.log(present === newPresent, present, newPresent)
        if (JSON.stringify(present) === JSON.stringify(newPresent)) {
          return state
        }
        return {
          past: [ ...past, present ],
          present: newPresent,
          future: []
        }
    }
  }
}