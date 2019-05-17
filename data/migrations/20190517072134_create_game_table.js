
exports.up = function(knex, Promise) {
	return knex.schema
	.createTable('game', function (tbl) {
		tbl.increments()
		
		tbl.string('title', 128)
		.notNullable()
		
		tbl.string('genre', 128)
		.notNullable()
		
		tbl.integer('releaseYear')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('game')
};
