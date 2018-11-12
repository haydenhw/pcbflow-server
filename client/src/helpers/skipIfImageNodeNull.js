const rewind = ({ past, present, future }) => {
  const previous = past[past.length - 1];
  const newPast = past.slice(0, past.length - 1);
  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}

const rewindDestructively = ({ past, present, future }) => {
  const previous = past[past.length - 2];
  const newPast = past.slice(0, past.length - 2);

  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}

const shouldSkip = (lastPastModule, present, lastPastArray) => {
  if (present.length === lastPastArray.length) {
    return true;
  }

  return false;
}

export default function skipIfImageNodeNull(past, present, future) {
  const lastPastArray = past[past.length -1];
  const lastPastModule = lastPastArray && lastPastArray[lastPastArray.length -1];

  if(true || !shouldSkip(lastPastModule, present, lastPastArray)) {
      return ({ past, present, future });
  }

  const { past: newPast, present: newPres, future: newFut } =
    rewindDestructively({ past, present, future });

  return skipIfImageNodeNull(newPast, newPres, newFut);
}
