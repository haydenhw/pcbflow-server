const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const ModuleSchema = mongoose.Schema({
  function: String,
  height: Number,
  width: Number
});


const ProjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  boardSpecs: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  modules: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    stroke: String,
    rotation: { type: Number, required: true },
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
    id: String,
    dependencies: [String]

  }],
  moduleBank: [{
    height: Number,
    width: Number,
    image: String
  }]
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
const Modules = mongoose.model('Modules', ModuleSchema);
const Projects = mongoose.model('Projects', ProjectSchema);

module.exports = { Modules, Projects, User };

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
