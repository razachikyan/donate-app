import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("items", (table) => {
    table.string("variant", 100).notNullable().defaultTo("charity").alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("items", (table) => {
    table.string("variant", 100).notNullable().defaultTo("user").alter();
  });
}
