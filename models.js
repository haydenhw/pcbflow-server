const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
  function: String,
  height: Number,
  width: Number
});

const projectSchema = mongoose.Schema({
  name: {type: String, required: true},
  boardSpecs: {
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    height: {type: Number, required: true},
    width: {type: Number, required: true},
    thumbnail: String
  },
  modules: [{  
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    height: {type: Number, required: true},
    width: {type: Number, required: true},
    stroke: String,
    rotation: {type: Number, required: true},
    boundToSideIndex: Number,
    innerGroupX: Number,
    innerGroupY: Number,
    text: String,
    textX: Number,
    textY: Number,
    imageSrc: String,
    imageX: Number,
    imageY: Number,
    imageWidth: Number,
    imageHeight: Number,
    iconSrc: String,
    iconHeight: String,
    price: Number,
    info: String
  }],
  moduleBank: [{
    height: Number,
    width: Number,
    image: String
  }]
});

const userSchema = mongoose.Schema({
  currentProjectId: String
})

const Modules = mongoose.model('Modules', moduleSchema);
const Projects = mongoose.model('Projects', projectSchema);

module.exports = {Modules , Projects};
/*
{
"name": "Test Project",
"boardSpecs": {
  "x": 50,
  "y": 50,
  "height": 300,
  "width": 500
},
"moudles": []
}*/