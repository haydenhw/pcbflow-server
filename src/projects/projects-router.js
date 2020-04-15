const path = require('path')
const express = require('express')
const xss = require('xss')
const ProjectsService = require('./projects-service')
const ModulesService = require('./modules-service')

const projectsRouter = express.Router()
const jsonParser = express.json()

const serializeProject = project => ({
  // TODO set this up (dont forget xss)
})

projectsRouter
  .route('/')
  .get(async (req, res, next) => {
    const knexInstance = req.app.get('db')
    try {
      const modules = await ModulesService.getAllModules(knexInstance)
      let projects = await ProjectsService.getAllProjects(knexInstance)
      projects = projects.map(project => {
        const {
          board_height: height,
          board_width: width,
          board_x: x,
          board_y: y,
          board_thumbnail: thumbnail,
        } = project;

        delete project.board_height;
        delete project.board_width;
        delete project.board_x;
        delete project.board_y;
        delete project.board_thumbnail;

        const board = { height, width, x, y, thumbnail }
        const childModules = modules.filter(m => m.project_id === project.id)
        return {
          ...project,
          board,
          modules: childModules
        }
      })

      res.json(projects)
    } catch(err) {
      next(err)
    }
  })
  .post(jsonParser, (req, res, next) => {
    const { title, content, style } = req.body
    const newProject = { title, content, style }

    for (const [key, value] of Object.entries(newProject))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    ProjectsService.insertProject(
      req.app.get('db'),
      newProject
    )
      .then(project => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${project.id}`))
          .json(serializeProject(project))
      })
      .catch(next)
  })

projectsRouter
  .route('/:project_id')
  .all((req, res, next) => {
    ProjectsService.getById(
      req.app.get('db'),
      req.params.project_id
    )
      .then(project => {
        if (!project) {
          return res.status(404).json({
            error: { message: `Project doesn't exist` }
          })
        }
        res.project = project
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeProject(res.project))
  })
  .delete((req, res, next) => {
    ProjectsService.deleteProject(
      req.app.get('db'),
      req.params.project_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, content, style } = req.body
    const projectToUpdate = { title, content, style }

    const numberOfValues = Object.values(projectToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title', 'style' or 'content'`
        }
      })

    ProjectsService.updateProject(
      req.app.get('db'),
      req.params.project_id,
      projectToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = projectsRouter
