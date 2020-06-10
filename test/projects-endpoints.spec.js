const knex = require('knex')
const app = require('../src/app')
const { makeProjects, makeModules, makeProjectsWithModules, makeMaliciousProject } = require('./projects.fixtures')

describe('Projects Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => {
    return db.raw('TRUNCATE TABLE projects CASCADE')
  })

  afterEach('clean the table', () => {
    return db.raw('TRUNCATE TABLE projects CASCADE')
  })

  describe(`GET /api/projects`, () => {
    context(`Given no projects`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/projects')
          .expect(200, [])
      })
    })

    context('Given there are projects in the database', () => {
      let testProjects = makeProjectsWithModules()

      beforeEach('insert projects', async () => {
        await db.into('projects').insert(makeProjects())
        await db.into('modules').insert(makeModules())
      })

      it('responds with 200 and all of the projects', () => {
        return supertest(app)
          .get('/api/projects')
          .expect(200, testProjects)
      })
    })

    context(`Given an XSS attack project`, () => {
      const { maliciousProject, expectedProject } = makeMaliciousProject()

      beforeEach('insert malicious project', () => {
        return db
          .into('projects')
          .insert([ maliciousProject ])
      })

      it('removes XSS attack', () => {
        return supertest(app)
          .get(`/api/projects`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].name).to.eql(expectedProject.name)
            expect(res.body[0].board_thumbnail).to.eql(expectedProject.board_thumbnail)
          })
      })
    })
  })

  describe(`GET /api/projects/:project_id`, () => {
    context(`Given no projects`, () => {
      it(`responds with 404`, () => {
        const projectId = 123456
        return supertest(app)
          .get(`/api/projects/${projectId}`)
          .expect(404, { error: { message: `Project doesn't exist` } })
      })
    })

    context('Given there are projects in the database', () => {
      const testProjects = makeProjects()

      beforeEach('insert projects', () => {
        return db
          .into('projects')
          .insert(testProjects)
      })

      it('responds with 200 and the specified project', () => {
        const projectId = 2
        const expectedProject = testProjects[projectId - 1]
        return supertest(app)
          .get(`/api/projects/${projectId}`)
          .expect(200, expectedProject)
      })
    })

    context(`Given an XSS attack project`, () => {
      const { maliciousProject, expectedProject } = makeMaliciousProject()

      beforeEach('insert malicious project', () => {
        return db
          .into('projects')
          .insert([ maliciousProject ])
      })

      it('removes XSS attack board_thumbnail', () => {
        return supertest(app)
          .get(`/api/projects/${maliciousProject.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.name).to.eql(expectedProject.name)
            expect(res.body.board_thumbnail).to.eql(expectedProject.board_thumbnail)
          })
      })
    })
  })

  describe(`POST /api/projects`, () => {
    it(`creates an project, responding with 201 and the new project`, () => {
      const newProject = {
        name: 'Test new project',
        board_height: 100,
        board_thumbnail: 'JSON string'
      }
      return supertest(app)
        .post('/api/projects')
        .send(newProject)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newProject.name)
          expect(res.body.board_height).to.eql(newProject.board_height)
          expect(res.body.board_width).to.eql(newProject.board_width)
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/projects/${res.body.id}`)
          const expected = new Date().toLocaleString()
          const actual = new Date(res.body.date_published).toLocaleString()
          expect(actual).to.eql(expected)
        })
        .then(res =>
          supertest(app)
            .get(`/api/projects/${res.body.id}`)
            .expect(res.body)
        )
    })

    const requiredFields = ['name', 'board_height', 'board_thumbnail']

    requiredFields.forEach(field => {
      const newProject = {
        name: 'Test new project',
        board_height: 100,
        board_thumbnail: 'Test new project board_thumbnail...'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newProject[field]

        return supertest(app)
          .post('/api/projects')
          .send(newProject)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })

    it('removes XSS attack from response', () => {
      const { maliciousProject, expectedProject } = makeMaliciousProject()
      return supertest(app)
        .post(`/api/projects`)
        .send(maliciousProject)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(expectedProject.name)
          expect(res.body.board_thumbnail).to.eql(expectedProject.board_thumbnail)
        })
    })
  })

  describe(`DELETE /api/projects/:project_id`, () => {
    context(`Given no projects`, () => {
      it(`responds with 404`, () => {
        const projectId = 123456
        return supertest(app)
          .delete(`/api/projects/${projectId}`)
          .expect(404, { error: { message: `Project doesn't exist` } })
      })
    })

    context('Given there are projects in the database', () => {
      const testProjects = makeProjects()

      beforeEach('insert projects', () => {
        return db
          .into('projects')
          .insert(testProjects)
      })

      it('responds with 204 and removes the project', () => {
        const idToRemove = 2
        const expectedProjects = testProjects.filter(project => project.id !== idToRemove)
        return supertest(app)
          .delete(`/api/projects/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/projects`)
              .expect(expectedProjects)
          )
      })
    })
  })

  describe(`PATCH /api/projects/:project_id`, () => {
    context(`Given no projects`, () => {
      it(`responds with 404`, () => {
        const projectId = 123456
        return supertest(app)
          .delete(`/api/projects/${projectId}`)
          .expect(404, { error: { message: `Project doesn't exist` } })
      })
    })

    context('Given there are projects in the database', () => {
      const testProjects = makeProjects()

      beforeEach('insert projects', () => {
        return db
          .into('projects')
          .insert(testProjects)
      })

      it('responds with 204 and updates the project', () => {
        const idToUpdate = 2
        const updateProject = {
          name: 'updated project name',
          board_height: 100,
          board_thumbnail: 'updated project board_thumbnail',
        }
        const expectedProject = {
          ...testProjects[idToUpdate - 1],
          ...updateProject
        }
        return supertest(app)
          .patch(`/api/projects/${idToUpdate}`)
          .send(updateProject)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/projects/${idToUpdate}`)
              .expect(expectedProject)
          )
      })

      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2
        return supertest(app)
          .patch(`/api/projects/${idToUpdate}`)
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must either 'name', 'board_height' or 'board_thumbnail'`
            }
          })
      })

      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2
        const updateProject = {
          name: 'updated project name',
        }
        const expectedProject = {
          ...testProjects[idToUpdate - 1],
          ...updateProject
        }

        return supertest(app)
          .patch(`/api/projects/${idToUpdate}`)
          .send({
            ...updateProject,
            fieldToIgnore: 'should not be in GET response'
          })
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/projects/${idToUpdate}`)
              .expect(expectedProject)
          )
      })
    })
  })
})
