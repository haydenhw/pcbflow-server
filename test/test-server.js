const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const assert = require('assert');

const should = chai.should();

const {Projects} = require('../models');
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

const compareKeys = (obj1, obj2) => {
  Object.keys(obj1).forEach((key) => {
    if (obj1[key] && key !== '_id') 
      obj1[key].should.equal(obj2[key])
  });
}

const generateDataArray = (callback, maxLength) => {
  let arr = [];

  for (let i = 0; i < Math.random() * maxLength + 1; i++) {
    arr.push(callback())
  }

  return arr;
}

generateModule = () => {
  return {
    x: Math.floor(Math.random() * 200),
    y: Math.floor(Math.random() * 200),
    height: Math.floor(Math.random() * 200),
    width: Math.floor(Math.random() * 200),
    stroke: faker.lorem.word(),
    rotation: Math.floor(Math.random() * 200),
    boundToSideIndex: Math.floor(Math.random() * 200),
    innerGroupX: Math.floor(Math.random() * 200),
    innerGroupY: Math.floor(Math.random() * 200),
    text: faker.lorem.word(),
    textX: Math.floor(Math.random() * 200),
    textY: Math.floor(Math.random() * 200),
    imageSrc: faker.lorem.word(),
    imageX: Math.floor(Math.random() * 200),
    imageY: Math.floor(Math.random() * 200),
    imageWidth: Math.floor(Math.random() * 200),
    imageHeight: Math.floor(Math.random() * 200),
    iconSrc: faker.lorem.word(),
    iconHeight: faker.lorem.word(),
    price: Math.floor(Math.random() * 200)
  }
}

generateBoardSpecs = () => {
  return {
    x: Math.floor(Math.random() * 200),
    y: Math.floor(Math.random() * 200),
    thumbnail: faker.lorem.word(),
    height: Math.floor(Math.random() * 200),
    width: Math.floor(Math.random() * 200)
  }
}

const generateProject = () => {
  return {
    name: faker.lorem.word(),
    modules: generateDataArray(generateModule, 6),
    board: generateBoardSpecs()
  }
}

const seedProjectData = () => {
  const seedData = generateDataArray(generateProject, 2);
  return Projects.insertMany(seedData);
}

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase().then(result => resolve(result)).catch(err => reject(err));
  });
}

describe('Projects API resource', function() {

  before(function() {
    return runServer();
  });

  beforeEach(function() {
    return seedProjectData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('/projects GET endpoint', function() {
    it('should return all existing projects', function() {

      let res;
      return chai.request(app).get('/projects').then(function(_res) {
        res = _res;
        res.should.have.status(200);
        res.body.should.have.length.of.at.least(1);
        return Projects.count();
      }).then(function(count) {
        res.body.should.have.length.of(count);
      });
    });

    it('should return projects with right fields', function() {

      let resProject;
      return chai.request(app).get('/projects').then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);

        res.body.forEach(function(project) {
          project.should.be.a('object');
          project.should.include.keys('name', 'modules', 'board');
        });

        resProject = res.body[0];
        return Projects.findById(resProject._id).exec();
      }).then(function(project) {
        resProject.name.should.equal(project.name);
        compareKeys(resProject.board, project.board)

        for (let i = 0; i < resProject.modules.length - 1; i++) {
          compareKeys(resProject.modules[i], project.modules[i])
        }
      });
    });
  });

  describe('/projects POST endpoint', function() {
    it('should add a new project', function() {

      const newProject = generateProject();
      return chai.request(app).post('/projects').send(newProject).then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('name', 'modules', 'board');
        res.body._id.should.not.be.null;
        res.body.name.should.equal(newProject.name);
        res.body.modules.should.have.length.of(newProject.modules.length);
        return Projects.findById(res.body._id);
      }).then(function(project) {
        newProject.name.should.equal(project.name);

        compareKeys(newProject.board, project.board)

        for (let i = 0; i < newProject.modules.length - 1; i++) {
          compareKeys(newProject.modules[i], project.modules[i])
        }

      });
    });
  });

  describe('/projects/:projectId PUT endpoint', function() {

    it('should update specified fields', function() {

      const updateData = {
        "name": "Updated Project",
        "modules": [
          {
            "info": null,
            "price": 2.25,
            "iconHeight": "70px",
            "iconSrc": "images/USB-hub-4-port-icon.svg",
            "imageSrc": "images/USB-hub-4-port.svg",
            "imageHeight": 30,
            "imageWidth": 30,
            "imageY": 10,
            "imageX": 20,
            "textY": 12.5,
            "textX": 5,
            "text": "USB Hub 4 Port",
            "innerGroupY": 0,
            "innerGroupX": 0,
            "boundToSideIndex": null,
            "rotation": 0,
            "height": 60,
            "width": 60,
            "stroke": "#62a799",
            "y": 69,
            "x": 10,
            "_id": "590cb0f0f5d2602d11144be4"
          }, {
            "info": null,
            "price": 2.25,
            "iconHeight": "70px",
            "iconSrc": "images/USB-hub-4-port-icon.svg",
            "imageSrc": "images/USB-hub-4-port.svg",
            "imageHeight": 30,
            "imageWidth": 30,
            "imageY": 10,
            "imageX": 20,
            "textY": 12.5,
            "textX": 5,
            "text": "USB Hub 4 Port",
            "innerGroupY": 0,
            "innerGroupX": 0,
            "boundToSideIndex": null,
            "rotation": 0,
            "height": 60,
            "width": 60,
            "stroke": "#62a799",
            "y": 105,
            "x": 40,
            "_id": "590cb0f0f5d2602d11144be3"
          }
        ],
        "board": {
          "y": 173,
          "x": 317,
          "thumbnail": "{\"attrs\":{\"width\":386,\"height\":346},\"className\":\"Stage\",\"children\":[{\"attrs\":{\"name\":\"boardLayer\"},\"className\":\"Layer\",\"children\":[{\"attrs\":{\"name\":\"boardGroup\",\"x\":10,\"y\":10,\"width\":366,\"height\":326,\"draggable\":\"true\"},\"className\":\"Group\",\"children\":[{\"attrs\":{\"name\":\"board\",\"width\":366,\"height\":326,\"fill\":\"#e3e3e5\",\"opacity\":\"0.5\",\"stroke\":\"#ccc\",\"isStrokeRed\":false},\"className\":\"Rect\"},{\"attrs\":{\"stroke\":\"#666\",\"fill\":\"#ddd\",\"radius\":\"8\",\"name\":\"topLeft\",\"draggable\":\"true\",\"dragOnTop\":\"false\"},\"className\":\"Circle\"},{\"attrs\":{\"x\":366,\"stroke\":\"#666\",\"fill\":\"#ddd\",\"radius\":\"8\",\"name\":\"topRight\",\"draggable\":\"true\",\"dragOnTop\":\"false\"},\"className\":\"Circle\"},{\"attrs\":{\"y\":326,\"stroke\":\"#666\",\"fill\":\"#ddd\",\"radius\":\"8\",\"name\":\"bottomLeft\",\"draggable\":\"true\",\"dragOnTop\":\"false\"},\"className\":\"Circle\"},{\"attrs\":{\"x\":366,\"y\":326,\"stroke\":\"#666\",\"fill\":\"#ddd\",\"radius\":\"8\",\"name\":\"bottomRight\",\"draggable\":\"true\",\"dragOnTop\":\"false\"},\"className\":\"Circle\"},{\"attrs\":{},\"className\":\"Group\",\"children\":[{\"attrs\":{\"draggable\":\"true\",\"name\":\"moduleGroup\",\"x\":10,\"y\":69,\"height\":60,\"width\":60,\"defaultStroke\":\"#62a799\",\"isStrokeRed\":true},\"className\":\"Group\",\"children\":[{\"attrs\":{\"fill\":\"black\",\"x\":5,\"y\":12.5,\"width\":60,\"text\":\"USB Hub 4 Port\",\"fontSize\":10,\"fontFamily\":\"sans-serif\"},\"className\":\"Text\"},{\"attrs\":{\"name\":\"innerGroup\"},\"className\":\"Group\",\"children\":[{\"attrs\":{\"width\":60,\"height\":60,\"fill\":\"green\",\"opacity\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"name\":\"moduleBorder\",\"width\":60,\"height\":60,\"stroke\":\"red\",\"strokeWidth\":1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":10},\"className\":\"Image\"}]}]},{\"attrs\":{\"draggable\":\"true\",\"name\":\"moduleGroup\",\"x\":40,\"y\":105,\"height\":60,\"width\":60,\"defaultStroke\":\"#62a799\",\"isStrokeRed\":true},\"className\":\"Group\",\"children\":[{\"attrs\":{\"fill\":\"black\",\"x\":5,\"y\":12.5,\"width\":60,\"text\":\"USB Hub 4 Port\",\"fontSize\":10,\"fontFamily\":\"sans-serif\"},\"className\":\"Text\"},{\"attrs\":{\"name\":\"innerGroup\"},\"className\":\"Group\",\"children\":[{\"attrs\":{\"width\":60,\"height\":60,\"fill\":\"green\",\"opacity\":0.1},\"className\":\"Rect\"},{\"attrs\":{\"name\":\"moduleBorder\",\"width\":60,\"height\":60,\"stroke\":\"red\",\"strokeWidth\":1},\"className\":\"Rect\"},{\"attrs\":{\"x\":20,\"y\":10},\"className\":\"Image\"}]}]}]}]}]}]}",
          "height": 326,
          "width": 366
        }
      }

      return Projects.findOne().exec().then(function(project) {
        updateData._id = project._id;
        return chai.request(app).put(`/projects/${project._id}`).send(updateData);
      }).then(function(res) {
        res.should.have.status(201);

        return Projects.findById(updateData._id).exec();
      }).then(function(project) {

        project.name.should.equal(updateData.name);

        compareKeys(updateData.board, project.board)

        for (let i = 0; i < updateData.modules.length - 1; i++) {
          compareKeys(updateData.modules[i], project.modules[i])
        }
      });
    });
  });

  describe('/projects/:projectId DELETE endpoint', function() {

    it('should delete a project by id', function() {

      let project;
      return Projects.findOne().exec().then(function(_project) {
        project = _project;
        return chai.request(app).delete(`/projects/${project.id}`);
      }).then(function(res) {
        res.should.have.status(204);
        return Projects.findById(project.id);
      }).then(function(_project) {
        should.not.exist(_project);
      });
    });
  });
});
