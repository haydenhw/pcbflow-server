export default function skipIfImageNodeNull(past, present) {
  const previous = past[past.length - 2];
  // console.log(past)
  if (previous && previous.length > 0) {
    const lastCurrentModule = present[present.length - 1];
    const lastPrevModule = previous[previous.length - 1];
    const secondToLastPrevModule = previous[previous.length - 2];
    // console.log(lastModule.imageNode)
    if (!lastPrevModule.imageNode) {
      return true;
    }

    // console.log(lastCurrentModule, secondToLastPrevModule)
    console.log(lastCurrentModule.metDependencies, lastPrevModule)
    // console.log(secondToLastCurrentModule.fill, secondToLastPrevModule.fill);
    if (
      // lastPrevModule &&  secondToLastPrevModule
       (lastCurrentModule.metDependencies && secondToLastPrevModule.metDependencies)
       && (lastCurrentModule.metDependencies.length !== secondToLastPrevModule.metDependencies.length)

    ) {
      return true;
    }

    if (
      (lastCurrentModule.metDependencies && !lastPrevModule.metDependencies)
    ) {
      return true;
    }

  }

  return false;
}
