export default function rotateAboutCenter(boundToSideIndex, prevRotation, x, y, width, height) {
  if (Number.isInteger(boundToSideIndex)) {
    boundToSideIndex = boundToSideIndex === 3
      ? 0
      : boundToSideIndex + 1;
  }

  let rotation = prevRotation === 360
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
      console.error('Rotation should be an integer equal to 0, 90, 180, 270, or 360, but instead was ', rotation);
  }

  rotation += 90;
  return { boundToSideIndex, rotation, x, y };
}
