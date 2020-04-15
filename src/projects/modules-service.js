const ModulesService = {
  getAllModules(knex) {
    return knex
      .select('*')
      .from('modules')
      .then(modules => {
        return modules.map(m => {
          return {...m, dependencies: m.dependencies.split(',') }
        })
      })
  },
  insertModules(knex, newModules) {
    newModules.forEach(m => { m.dependencies = m.dependencies.join(); })
    return knex
      .insert(newModules)
      .into('modules')
      .returning('*')
      .then(rows => rows) // TODO is this line necessary?
  },
  getById(knex, id) {
    return knex.from('modules').select('*').where('id', id).first()
  },
  deleteModule(knex, id) {
    return knex('modules')
      .where({ id })
      .delete()
  },
  deleteByProjectId(knex, project_id) {
    return knex('modules')
      .where({ project_id })
      .delete()
  },
  updateModule(knex, id, newModuleFields) {
    return knex('modules')
      .where({ id })
      .update(newModuleFields)
  },
}

module.exports = ModulesService
