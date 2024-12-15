import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", (table) => {
    table.increments("category_id").primary();
    table.string("name", 50).notNullable();
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("categories");
}
