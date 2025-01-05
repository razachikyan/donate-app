import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("items", (table) => {
    table.string("address", 100).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("items", (table) => {
    table.dropColumn("address");
  });
}
