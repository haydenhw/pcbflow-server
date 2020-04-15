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

const destructureProject = (project) => {
  const {
    name,
    owner_id,
    board_height,
    board_width,
    board_x,
    board_y,
    board_thumbnail,
  } = project;

  return {
    name,
    owner_id,
    board_height,
    board_width,
    board_x,
    board_y,
    board_thumbnail,
  }
}
const destructureModule = (module) => {
  const {
    id,
    project_id,
    module_id,
    price,
    icon_height,
    icon_src,
    image_src,
    image_height,
    image_width,
    image_y,
    image_x,
    text_y,
    text_x,
    text,
    inner_group_y,
    inner_group_x,
    bound_to_side_index,
    rotation,
    height,
    width,
    stroke,
    y,
    x,
    dependencies,
  } = module;

  return {
    id,
    project_id,
    module_id,
    price,
    icon_height,
    icon_src,
    image_src,
    image_height,
    image_width,
    image_y,
    image_x,
    text_y,
    text_x,
    text,
    inner_group_y,
    inner_group_x,
    bound_to_side_index,
    rotation,
    height,
    width,
    stroke,
    y,
    x,
    dependencies,
  };
}

const flattenBoard = (req, res, next) => {
  const {board_specs} = req.body
  req.body.board_x = board_specs.x;
  req.body.board_y = board_specs.y;
  req.body.board_width = board_specs.width;
  req.body.board_height = board_specs.height;
  req.body.board_thumbnail = board_specs.thumbnail;

  next();
}

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
  .patch(jsonParser, flattenBoard, async (req, res, next) => {
    const knexInstance = req.app.get('db')
    const { project_id } = req.params
    // TODO add some validation
    const projectToUpdate = destructureProject(req.body)
    await ProjectsService.updateProject(knexInstance, project_id, projectToUpdate)

    let { modules: modulesToUpdate }  = req.body
    modulesToUpdate = modulesToUpdate.map(destructureModule);
    await ModulesService.deleteByProjectId(knexInstance, project_id)
    await ModulesService.insertModules(knexInstance, modulesToUpdate );

    res.status(204).end()
  })

module.exports = projectsRouter
