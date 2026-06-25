// Inplements a Postgres client using the `pg` library.
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function execute(text: string, params?: any[]): Promise<void> {
  await pool.query(text, params);
}

export async function close(): Promise<void> {
  await pool.end();
}
