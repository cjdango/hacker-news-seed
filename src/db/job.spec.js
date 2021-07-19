import { makeDB } from '../../__test__/fixtures/db';
import makeFakeJob from '../../__test__/fixtures/job';
import makeJobDB from "./job";

describe('jobDB', () => {
  let jobDB;
  let pool;

  beforeAll(async function () {
    const [localPool, client] = await makeDB('hackernewstest');

    pool = localPool;

    jobDB = makeJobDB({
      makeDB: () => client,
    });
  })

  afterAll(async function () {
    await pool.end();
  });

  it('can insert a job into the database', async function () {
    const job = makeFakeJob();
    const { rowCount } = await jobDB.insert(job);
    expect(rowCount).toEqual(1);
  });
});