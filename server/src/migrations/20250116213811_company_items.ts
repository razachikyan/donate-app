import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("company_items", (table) => {
      table.uuid("item_id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("title", 100).notNullable();
      table.text("description").notNullable();
      table.string("category", 50).notNullable();
      table.enu("condition", ["new", "good", "used"]).notNullable();
      table.enu("status", ["available", "reserved", "donated"]).notNullable();
      table
        .uuid("donor_id")
        .references("company_id")
        .inTable("companies")
        .onDelete("CASCADE")
        .notNullable();
      table
        .uuid("recipient_id")
        .references("company_id")
        .inTable("companies")
        .onDelete("SET NULL");
      table.string("image_url", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    }); 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("company_items");
}

