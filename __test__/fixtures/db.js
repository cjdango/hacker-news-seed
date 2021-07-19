import { Pool } from 'pg';
import createTablesTransaction from '../../scripts/create-tables/create-tables-transaction';

export async function createTables() {
  const [pool, client] = await makeDB('hackernewstest');

  await createTablesTransaction(client);

  client.release();

  await pool.end();
}

export async function initializeDB() {
  const [pool, client] = await makeDB();

  await client.query('CREATE DATABASE hackernewstest');

  client.release();

  await pool.end();
}

export async function closeDB() {
  const [pool, client] = await makeDB();

  await client.query('DROP DATABASE hackernewstest');
  
  client.release();
  
  await pool.end();
}

export async function makeDB(dbname = 'postgres') {
  const pool = new Pool({
    database: dbname,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

  const client = await pool.connect();

  return [pool, client];
}
