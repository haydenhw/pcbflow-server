const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const { Projects } = require('../models');
const { IS_AUTH_ACTIVE } = require('../config');
const projectRouter = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

projectRouter.use(bodyParser.urlencoded({
  extended: true
}));

projectRouter.use(bodyParser.json());

const activateAuth = (req, res, next) => {
  IS_AUTH_ACTIVE
    ? jwtAuth(req, res, next)
    : next();
}

projectRouter.get('/', activateAuth, (req, res) => {
  const query = IS_AUTH_ACTIVE
    ? { ownerId: req.user._id }
    : {};

  Projects
    .find(query)
    .exec()
    .then(projects => res.json(projects))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

projectRouter.get('/:projectId', (req, res) => {
  Projects
    .findById(req.params.projectId)
    .exec()
    .then(project => res.json(project))
    .catch(err => {
        console.error(err);
        res.status(404).json({message: 'Project Not Found'});
      });
});

projectRouter.post('/', (req, res) => {
  Projects
    .create({
      board: req.body.board,
      name: req.body.name,
      modules: req.body.modules,
      ownerId: req.body.ownerId,
    })
  .then(project => res.status(201).json(project))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

projectRouter.put('/:projectId', (req, res) => {
  const toUpdate = {};
  const updateableFields = ['name', 'board', 'modules'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Projects
    .findByIdAndUpdate(req.params.projectId, {$set: toUpdate}, {new: true})
    .exec()
    .then(project => res.status(201).json(project))
    .catch(err =>
      res.status(500).json({message: 'Internal server error'})
    );
});

projectRouter.delete('/:projectId', (req, res) => {
  Projects
    .findByIdAndRemove(req.params.projectId)
    .exec()
    .then(project => res.status(204).json(project))
    .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = projectRouter;
