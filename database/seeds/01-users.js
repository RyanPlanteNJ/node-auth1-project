
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').insert([
    {username: 'frodo', password: 'sameismybffl'}
  ])

};
