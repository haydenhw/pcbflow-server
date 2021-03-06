const pg = require('pg');
pg.types.setTypeParser(1700, parseFloat);
const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

if (!DB_URL) {
  throw new Error('DB_URL environment variable is undefined')
}

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
