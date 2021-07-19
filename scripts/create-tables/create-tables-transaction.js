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
            deleted BOOLEAN,
            by VARCHAR,
            time BIGINT,
            text VARCHAR,
            dead BOOLEAN,
            kids INTEGER[],
            url VARCHAR,
            score INTEGER,
            title VARCHAR,
            descendants INTEGER
          );
        `);

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS jobs (LIKE stories INCLUDING ALL);
        `);

    await client
      .query(`
          CREATE TABLE IF NOT EXISTS comments (
            LIKE stories INCLUDING ALL, parent INTEGER
          );
      `);

    await client.query('COMMIT');

  } catch (error) {
    console.log(error.stack);
  } finally {
    return client;
  }
}