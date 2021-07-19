import { makeDB } from '../../__test__/fixtures/db';
import makeFakeComment from '../../__test__/fixtures/comment';
import makeCommentDB from "./comment";

describe('commentDB', () => {
  let commentDB;
  let pool;

  beforeAll(async function () {
    const [localPool, client] = await makeDB('hackernewstest');

    pool = localPool;

    commentDB = makeCommentDB({
      makeDB: () => client,
    });
  })

  afterAll(async function () {
    await pool.end();
  });

  it('can insert a comment into the database', async function () {
    const comment = makeFakeComment();
    const { rowCount } = await commentDB.insert(comment);
    expect(rowCount).toEqual(1);
  });
});