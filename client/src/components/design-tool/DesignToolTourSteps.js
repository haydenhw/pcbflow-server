export const steps = [
  {
    title: 'Title only steps — As they say: Make the font bigger!',
    textAlign: 'center',
    selector: '.test',
    position: 'right'
  },
  {
    title: 'Our Mission',
    text: 'Can be advanced by clicking an element through the overlay hole.',
    selector: '.test2',
    position: 'bottom',
    allowClicksThruHole: true,
    style: {
      beacon: {
        offsetY: 20
      },
      button: {
        display: 'none',
      }
    }
  }
]