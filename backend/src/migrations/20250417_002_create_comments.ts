import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE');
    table.text('body').notNullable();
    table.string('author').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('comments');
}