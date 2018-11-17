const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const ModuleSchema = mongoose.Schema({
  function: String,
  height: Number,
  width: Number,
});


const ProjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  ownerId: {
    type: String,
    required: true,
  },
  boardSpecs: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    thumbnail: { type: String, required: false },
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
    dependencies: [String],
  }],
  isTutorialProject: Boolean,
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
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    _id: this._id || '',
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
