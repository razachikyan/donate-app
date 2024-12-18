import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.string("firstName", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.dropColumn("name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.dropColumn("firstName");
    table.dropColumn("lastName");
    table.string("name", 100).notNullable();
  });
}
