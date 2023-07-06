import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal', (table) => {
    table.uuid('id').primary()
    table.string('userId').references('id').inTable('users')
    table.string('name').notNullable()
    table.string('description')
    table.boolean('isInDiet').notNullable()
    table.timestamp('mealHour').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meal')
}

