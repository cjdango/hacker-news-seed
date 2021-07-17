
import retrieveStories from './retrieve-stories';
import { story, job, comment } from './db'

retrieveStories()
  .on('story', story.insert)
  .on('job', job.insert)
  .on('comment', comment.insert);
