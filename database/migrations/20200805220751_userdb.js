
exports.up = function(knex) {
  return knex.schema
    .createTable('user', tbl => {
      tbl.increments();
      tbl.string('username',128).notNullable().unique().index();
      tbl.string('password',255).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
