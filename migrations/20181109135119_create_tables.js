exports.down = knex =>
  Promise.all([
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('threads'),
    knex.schema.dropTableIfExists('boards'),
  ])

exports.up = knex =>
  Promise.all([
    knex.schema
      .createTable('boards', table => {
        table.increments('boardID').primary()
        table.string('name')
        table.string('description')
      }),
    knex.schema
      .createTable('threads', table => {
        table.increments('threadID').primary()
        table.string('name')
        table.integer('boardID')
        table.foreign('boardID').references('boardID').inTable('boards')
      }),
    knex.schema
      .createTable('posts', table => {
        table.increments('postID').primary()
        table.text('message')
        table.string('author')
        table.integer('threadID')
        table.foreign('threadID').references('threadID').inTable('threads')
      }),
  ])
