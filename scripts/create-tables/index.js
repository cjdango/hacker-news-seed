import { Pool } from 'pg';
import createTablesTransaction from './create-tables-transaction';

const pool = new Pool();

pool
  .connect()
  .then(createTablesTransaction)
  .then(client => client.release())
  .then(() => pool.end());
