/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.uuid('taskid').defaultTo(knex.fn.uuid()).primary();
        table.string('name').unique();
        table.text('description').unique();
        table.string('category').notNullable();
        table.string('startdate').notNullable();
        table.string('duration').notNullable();
        table.timestamps({defaultToNow:true});
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
