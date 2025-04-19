import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("items", (table) => {
    table.string("variant", 100).notNullable().defaultTo("user"); // need to change to charity
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("items", (table) => {
    table.dropColumn("variant");
  });
}
