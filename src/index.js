
import fs from 'fs';
import retrieveStories from './retrieve-stories';
import { story, job, comment } from './db'

const logFile = fs.createWriteStream('./log.txt')

const log = (message) => {
  console.log(message);
  logFile.write(message + '\n');
};

const makeInsertCallback = (insert) =>
  (item) => {
    log(`inserting ${item.type} ${item.id}`);
    insert(item);
  }

retrieveStories()
  .on('skip', (id) => log(`skipping ${id}, can\'t fetch or item is null`))
  .on('finish', () => log('finish seeding!'))
  .on('story', makeInsertCallback(story.insert))
  .on('job', makeInsertCallback(job.insert))
  .on('comment', makeInsertCallback(comment.insert));
