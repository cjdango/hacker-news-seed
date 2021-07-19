export default async function createTablesTransaction(client) {
  try {
    await client.query('BEGIN')

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS comment_parents (
              id INTEGER PRIMARY KEY
          );
        `);

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS stories (
            id INTEGER PRIMARY KEY,
            by VARCHAR NOT NULL
          );
        `);

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY,
            by VARCHAR NOT NULL
          );
        `);

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            by VARCHAR NOT NULL,
            parent INTEGER NOT NULL REFERENCES comment_parents(id)
          );
        `);

    await client.query('COMMIT');

  } catch (error) {
    console.log(error.stack);
  } finally {
    return client;
  }
}