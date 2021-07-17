import retrieveStories from '.';
import { Writable } from 'stream';

describe('.retrieveStories', function () {
  it('fetches stories', async function () {
    const response = await retrieveStories({
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    });

    const fetchDecendants = (ids) => {
      return Promise.all(ids.map(async function (id) {
        const res = await retrieveStories({
          url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        });

        const result = {
          ...res.data,
          kids: res.data.kids ? await fetchDecendants(res.data.kids) : undefined,
        };

        console.log(result);

        return result
      }));
    }

    console.log(await fetchDecendants(response.data))
  }, 30000);
});