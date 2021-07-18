import httpClient from '../http-client';
import makeRetrieveStories from './retrieve-stories.js';
import EventEmitter from 'events';

const fetchTopStories = async () => {
  try {
    const response = await httpClient('https://hacker-news.firebaseio.com/v0/topstories.json');
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

const fetchItem = async (id) => {
  try {
    const response = await httpClient(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

const retrieveStories = makeRetrieveStories({
  fetchTopStories,
  fetchItem,
  emitter: new EventEmitter(),
});

export default retrieveStories;