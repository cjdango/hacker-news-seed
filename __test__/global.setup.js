import { initializeDB, createTables } from './fixtures/db';

export default async function setup() {
  await initializeDB();
  await createTables();
}