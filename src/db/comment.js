import { makeColumns, makeValues } from "./helpers";

export default function makeCommentDB({ makeDB }) {
  return Object.freeze({
    insert,
  });

  async function insert(arg) {
    const item = {
      id: arg.id,
      deleted: arg.deleted,
      by: arg.by,
      time: arg.time,
      text: arg.text,
      dead: arg.dead,
      kids: arg.kids,
      url: arg.url,
      score: arg.score,
      title: arg.title,
      descendants: arg.descendants,
      parent: arg.parent,
    }

    const client = await makeDB();

    await client.query('BEGIN');

    await client.query(`
      INSERT INTO comment_parents(id)
      VALUES (${item.parent})
      ON CONFLICT DO NOTHING;
    `);

    const [template, values] = makeValues(item);

    const result = await client.query(`
      INSERT INTO comments(${makeColumns(item)})
      VALUES (${template})
      ON CONFLICT DO NOTHING;
    `, values);

    await client.query('COMMIT');

    client.release();

    return result;
  }
}