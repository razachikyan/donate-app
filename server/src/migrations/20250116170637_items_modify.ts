import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
     await knex.schema.alterTable("transactions", (table) => {
       table.dropForeign("donor_id", "transactions_donor_id_foreign");
     });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("transactions", (table) => {
      table.foreign("donor_id").references("users.user_id").onDelete("CASCADE");
    });
}

