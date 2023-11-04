/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('user_id').defaultTo(knex.fn.uuid()).primary();
        table.string('email').unique();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('password').notNullable();
        table.timestamps({defaultToNow:true});
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
