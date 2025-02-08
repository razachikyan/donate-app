import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("transactions");
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.createTable("transactions", (table) => {
      table.uuid("transaction_id").primary();
      table.uuid("item_id").notNullable();
      table.uuid("donor_id").notNullable();
      table.uuid("recipient_id").nullable();
      table
        .enu("status", ["in_progress", "completed", "cancelled"])
        .defaultTo("in_progress");
      table.date("pickup_date").nullable();
      table.date("delivery_date").nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.foreign("item_id").references("items.item_id").onDelete("CASCADE");
      table.foreign("donor_id").references("users.user_id").onDelete("CASCADE");
      table
        .foreign("recipient_id")
        .references("users.user_id")
        .onDelete("SET NULL");
    });
}

