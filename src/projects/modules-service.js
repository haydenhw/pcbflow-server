const ModulesService = {
  getAllModules(knex) {
    return knex
      .select('*')
      .from('modules')
      .then(modules => {
        return modules.map(m => {
          return {...m, dependencies: m.dependencies.split(', ') }
        })
      })
  },
  insertModule(knex, newModule) {
    return knex
      .insert(newModule)
      .into('modules')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('modules').select('*').where('id', id).first()
  },
  deleteModule(knex, id) {
    return knex('modules')
      .where({ id })
      .delete()
  },
  updateModule(knex, id, newModuleFields) {
    return knex('modules')
      .where({ id })
      .update(newModuleFields)
  },
}

module.exports = ModulesService
