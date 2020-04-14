require('dotenv').config()
const knex = require('knex')

const { makeProjects, makeProjectsWithModules } = require('../test/projects.fixtures')
console.log(process.env.DB_URL)

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

db('projects').truncate()
db.into('projects')
  .insert(makeProjects())
  .then(res=> {
    console.log(`Inserted ${res.rowCount} new rows into the projects table`);

    db('modules').truncate()
    db.into('modules')
      .insert(makeProjectsWithModules()[0].modules)
      .then(res=> {
        console.log(`Inserted ${res.rowCount} new rows into the modules table`);
      })
  })