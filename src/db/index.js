import { Pool } from 'pg';
import makeStoryDB from './story';
import makeJobDB from './job';
import makeCommentDB from './comment';

const pool = new Pool();

function makeDB() {
  return pool.connect();
}

const story = makeStoryDB({ makeDB });
const job = makeJobDB({ makeDB });
const comment = makeCommentDB({ makeDB });

export {
  story,
  job,
  comment,
}


