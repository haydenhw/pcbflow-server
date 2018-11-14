export default function checkExceedsPerimeter(itemArray, perimeter) {
  const outOfBoundsItems = [];

    itemArray.forEach((item, index) => {
    const { x, y, width, height } = item;
    const { height: perimeterHeight, width: perimeterWidth,  } = perimeter;

    const exceedsLeft = x < 0;
    const exceedsRight = x + width > perimeterWidth;
    const exceedsTop = y < 0;
    const exceedsBottom = y + height > perimeterHeight;

    if (exceedsLeft || exceedsRight || exceedsTop || exceedsBottom) {
      outOfBoundsItems.push(item);
    }
  });

  return outOfBoundsItems;
}
