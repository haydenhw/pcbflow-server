export default function rotateAboutCenter(prevBoundToSideIndex, prevRotation, x, y, width, height) {
  let rotation;
  let boundToSideIndex

  if (Number.isInteger(prevBoundToSideIndex)) {
    boundToSideIndex = prevBoundToSideIndex === 3
      ? 0
      : prevBoundToSideIndex + 1;
  }

  rotation = prevRotation === 360
    ? 0
    : prevRotation;

  switch (rotation) {
    case 0:
      x += 0.5 * (width + height);
      y += 0.5 * (height - width);
      break;
    case 90:
      x += 0.5 * (width - height);
      y += 0.5 * (width + height);
      break;
    case 180:
      x -= 0.5 * (width + height);
      y += 0.5 * (width - height);
      break;
    case 270:
      x -= 0.5 * (width - height);
      y -= 0.5 * (width + height);
      break;
    default:
      console.error('rotation should be an integer equal to 0, 90, 180, 270, or 360, but instead was ', rotation);
  }

  rotation += 90;

  return {
    boundToSideIndex,
    rotation,
    x,
    y,
  };
}
