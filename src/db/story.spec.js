import { makeDB } from '../../__test__/fixtures/db';
import makeFakeStory from '../../__test__/fixtures/story';
import makeStoryDB from "./story";

describe('storyDB', () => {
  let storyDB;
  let pool;

  beforeAll(async function () {
    const [localPool, client] = await makeDB('hackernewstest');

    pool = localPool;

    storyDB = makeStoryDB({
      makeDB: () => client,
    });
  })

  afterAll(async function () {
    await pool.end();
  });

  it('can insert a story into the database', async function () {
    const story = makeFakeStory();
    const { rowCount } = await storyDB.insert(story);
    expect(rowCount).toEqual(1);
  });
});