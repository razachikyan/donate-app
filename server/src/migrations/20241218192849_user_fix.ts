import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.dropColumn("password_hash");
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.string("password_hash", 255).notNullable();
    table.dropColumn("password");
  });
}
