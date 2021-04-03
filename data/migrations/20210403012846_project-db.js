exports.up = function (knex) {
	return knex.schema
		.createTable('resources', (tbl) => {
			tbl.increments();
			tbl.string('resource_name', 128).notNullable().unique();
			tbl.string('resource_description', 512);
		})
		.createTable('projects', (tbl) => {
			tbl.increments();
			tbl.string('project_name', 128).notNullable();
			tbl.string('project_description', 512);
			tbl.boolean('project_completed').notNullable();
		})
		.createTable('tasks', (tbl) => {
			tbl.increments();
			tbl.string('task_description', 512).notNullable();
			tbl.string('task_notes', 512);
			tbl.boolean('task_completed').notNullable();
			tbl.bigint('id')
				.unsigned()
				.references('projects.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('project_resources', (tbl) => {
			tbl.increments();
			tbl.bigint('id')
				.unsigned()
				.references('projects.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.bigint('id')
				.unsigned()
				.references('resources.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('project_resources')
		.dropTableIfExists('tasks')
		.dropTableIfExists('projects')
		.dropTableIfExists('resources');
};
