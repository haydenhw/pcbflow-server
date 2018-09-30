var assert = require('assert');
const Maybe  = require('monet').Maybe;

const modules = [
  {
    id: '110',
    price: 5,
    iconHeight: '70px',
    iconSrc: 'images/barrel-connector-icon.svg',
    imageSrc: 'images/barrel-connector.svg',
    imageHeight: 100,
    imageWidth: 70,
    imageY: 10,
    imageX: 10,
    textY: 25,
    textX: 10,
    text: 'Barrel Connector (20V 3A)',
    innerGroupY: 10,
    innerGroupX: 100,
    boundToSideIndex: 1,
    rotation: 90,
    height: 110,
    width: 90,
    stroke: '#00796b',
    y: 207,
    x: 10,
    _id: '5ab9f30af713b63f297d8801',
    dependencies: [],
    metDependencies: [],
    imageNode: {}
  },
  {
    id: '105',
    price: 48,
    iconHeight: '70px',
    iconSrc: 'images/COM-connector.svg',
    imageSrc: 'images/COM-connector.svg',
    imageHeight: 125,
    imageWidth: 250,
    imageY: 4,
    imageX: 2,
    textY: 32,
    textX: 76,
    text: 'COM Connector',
    innerGroupY: -60.5,
    innerGroupX: 193.5,
    boundToSideIndex: null,
    rotation: 90,
    height: 133,
    width: 254,
    stroke: '#01579b',
    y: 169,
    x: 244,
    _id: '5ab9f30af713b63f297d8800',
    dependencies: [
      '109'
    ],
    metDependencies: [
      '109'
    ],
    imageNode: {}
  },
  {
    id: '109',
    price: 9.75,
    iconHeight: '70px',
    iconSrc: 'images/regulator-5V5A-icon.svg',
    imageSrc: 'images/regulator-5V5A.svg',
    imageHeight: 80,
    imageWidth: 40,
    imageY: 10,
    imageX: 12.5,
    textY: 25,
    textX: 15,
    text: '5V/5A Regulator',
    innerGroupY: 0,
    innerGroupX: 0,
    boundToSideIndex: null,
    rotation: 360,
    height: 100,
    width: 65,
    stroke: '#7e57c2',
    y: 67.5,
    x: 439.5,
    _id: '5ab9f30af713b63f297d87ff',
    dependencies: [
      '110'
    ],
    metDependencies: [
      '110'
    ],
    imageNode: {}
  },
];


let joeUser = {
  pay: 100,
  name: 'joe',
  email: 'joe@example.com',
  prefs: {
    languages: {
      primary: 'sp',
      secondary: 'en'
    }
  }
}

let indexURLs = {
    'en': 'http://mysite.com/en',  //English
     'sp': 'http://mysite.com/sp', //Spanish
    'jp': 'http://mysite.com/jp'   //Japanese
}

const MaybeGetUserJob = (MaybeUser) => {
  // Maybe.fromNull(MaybeUser.val.job)
}

const getProjectById = (projects) => (id) => projects.find((project) => project._id === id);

const MaybeGetProjectById = (projects) => (id) => (
  Maybe.fromNull(projects)
    .chain(projects => (
      Maybe.fromNull(getProjectById(projects)(id))
    ))
);


// .map(user => Maybe.fromNull(user.job).orSome('default job'))
// const getProjectById = projects => activeProjectId => (
//   projects && (projects.length > 0) && activeProjectId
//     ? projects.find((project) => project._id === activeProjectId)
//     // ? console.log(projects)
//     : undefined
// );
// const chainTest = (user) => (
//   Maybe.fromNull(user)
//     .map(user => user.pay)
//     .orSome('default')
// )

// const actualResult  = MaybeGetProjectById(modules)(null);
const actualResult  = MaybeGetProjectById(modules)('5ab9f30af713b63f297d87ff');
const expectedResult = 'trucker';

console.log(actualResult);
// describe('test function', function() {
//   it('', function() {
//     assert.equal(actualResult, expectedResult); });
// });

function compose(...fnArgs) {
  const [first, ...funcs] = fnArgs.reverse();
  return function(...args) {
    return funcs.reduce((res, fn) => fn(res), first(...args));
  };
}
