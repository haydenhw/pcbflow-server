const rewind = ({ past, present, future }) => {
  const previous = past[past.length - 1];
  const newPast = past.slice(0, past.length - 1);
  console.count();
  return {
    past: newPast,
    present: previous,
    future: [present, ...future],
  };
}
const test = (lastPastModule, present) => {
  if (lastPastModule && !lastPastModule.imageNode) {
    return true;
  }

  if (!present.imageNode) {
    return true;
  }

  return false;
}

export default function skipIfImageNodeNull({ past, present, future }) {
  const lastPastArray = past[past.length -1];
  const lastPastModule = lastPastArray && lastPastArray[lastPastArray.length -1];

  if (present.length === 0) {
    return  {
      past: [],
      present: [],
      future: [future],
    };
  }

  if(test(lastPastModule, present)) {
    // console.log('test pass')
    // const { past: newPast, present: newPres, future: newFut } =
      // rewind(past, present, future);

    return skipIfImageNodeNull(newPast, newPres, newFut);
  }


  return rewind({ past, present, future });
}
