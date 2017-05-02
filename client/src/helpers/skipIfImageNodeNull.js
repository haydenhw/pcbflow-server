export default function skipIfImageNodeNull(past) {
  const previous = past[past.length - 1];

  if (previous && previous.length > 0) {
    const lastModule = previous[previous.length - 1];
    if (!lastModule.imageNode) {
      return true;
    }
  }

  return false;
}
