import knex, { Knex } from "knex";
import "dotenv/config";

class Database {
  private static instance: Database;
  private _knex: Knex;

  private constructor() {
    this._knex = knex({
      client: "pg",
      connection: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "admin",
        database: process.env.DB_NAME || "my_database",
      },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getKnex(): Knex {
    return this._knex;
  }
}

export default Database.getInstance().getKnex();
