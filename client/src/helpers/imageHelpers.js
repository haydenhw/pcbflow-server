export const loadImage = imgSrc => (
  new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = imgSrc;
  })
);

export const loadImages = imgSrcs => Promise.all(imgSrcs.map(loadImage));
