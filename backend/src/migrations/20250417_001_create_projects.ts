import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('client').notNullable();
    table.string('status').notNullable().defaultTo('planning');
    table.decimal('budget', 14, 2).notNullable();
    table.decimal('spent', 14, 2).notNullable().defaultTo(0);
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('projects');
}