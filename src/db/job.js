import { makeColumns, makeValues } from "./helpers";

export default function makeJobDB({ makeDB }) {
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
      descendants: arg.descendants
    }

    const client = await makeDB();

    const [template, values] = makeValues(item);

    const result = await client.query(`
      INSERT INTO jobs(${makeColumns(item)})
      VALUES (${template})
      ON CONFLICT DO NOTHING;
    `, values);

    client.release();

    return result;
  }
}