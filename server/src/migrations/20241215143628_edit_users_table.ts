import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.dropColumn("role");
    table.dropColumn("address");
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
    table.boolean("is_active");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("users", (table) => {
    table.text("address");
    table.enu("role", ["donor", "recipient", "admin"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.dropColumn("is_active");
  });
}
