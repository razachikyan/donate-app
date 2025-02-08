import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("company_refresh_tokens");
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable("company_refresh_tokens", (table) => {
    table.increments("id").primary();
    table
      .uuid("company_id")
      .notNullable()
      .references("company_id")
      .inTable("companies")
      .onDelete("CASCADE");
    table.text("token").notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("expires_at");
  });
}
