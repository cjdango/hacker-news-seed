export default function makeCommentDB({ makeDB }) {
  return Object.freeze({
    insert,
  });

  async function insert(item) {
    const client = await makeDB();

    await client.query('BEGIN');

    await client.query(`
      INSERT INTO comment_parents(id)
      VALUES (${item.parent})
      ON CONFLICT DO NOTHING;
    `);

    const result = await client.query(`
      INSERT INTO comments(id, by, parent)
      VALUES (${item.id}, '${item.by}', ${item.parent})
      ON CONFLICT DO NOTHING;
    `);

    await client.query('COMMIT');

    client.release();

    return result;
  }
}