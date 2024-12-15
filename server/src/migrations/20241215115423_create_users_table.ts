import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("user_id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name", 100).notNullable();
    table.string("email", 150).unique().notNullable();
    table.string("password_hash", 255).notNullable();
    table.string("phone", 20);
    table.text("address");
    table.enu("role", ["donor", "recipient", "admin"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
