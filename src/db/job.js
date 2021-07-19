export default function makeJobDB({ makeDB }) {
  return Object.freeze({
    insert,
  });

  async function insert(item) {
    const client = await makeDB();

    const result = await client.query(`
      INSERT INTO jobs(id, by)
      VALUES (${item.id}, '${item.by}')
      ON CONFLICT DO NOTHING;
    `);

    client.release();

    return result;
  }
}