export default function makeStoryDB({ makeDB }) {
  return Object.freeze({
    insert,
  });

  async function insert(item) {
    const client = await makeDB();

    const result = await client.query(`
      INSERT INTO stories(id, by)
      VALUES (${item.id}, '${item.by}')
      ON CONFLICT DO NOTHING;
    `);

    client.release();

    return result;
  }
}