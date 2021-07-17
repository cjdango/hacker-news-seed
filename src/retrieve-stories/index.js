import axios from 'axios';
import makeRetrieveStories from './retrieve-stories.js';

const retrieveStories = makeRetrieveStories({
    fetchTopStories: () => axios('https://hacker-news.firebaseio.com/v0/topstories.json'),
    fetchItem: (id) => axios(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
})

export default retrieveStories;