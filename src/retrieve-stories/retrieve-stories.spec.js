import EventEmitter from 'events';
import { makeFetchTopStories, makeFetchItem } from '.';
import makeRetrieveStories from './retrieve-stories';


const makeFakeRetrieveStories = (overrides = {}) =>
  makeRetrieveStories({
    fetchTopStories: makeFetchTopStories({
      httpClient: () => Promise.resolve({
        data: [27875158]
      })
    }),
    fetchItem: makeFetchItem({
      httpClient: (url) => {
        const responses = {
          '/v0/item/27875158.json': () => Promise.resolve({
            data: {
              by: 'spideymans',
              descendants: 1,
              id: 27875158,
              kids: [
                27875662,
              ],
              score: 116,
              time: 1626632533,
              title: 'An app for M1 Macs that plays the sound of a fan as CPU usage goes up',
              type: 'story',
              url: 'https://fanfan.rambo.codes/'
            }
          }),

          '/v0/item/27875662.json': () => Promise.resolve({
            data: {
              by: 'jmkni',
              id: 27875662,
              kids: [
                27875663,
              ],
              parent: 27875158,
              text: 'Pre M1, I&#x27;ve always preferred a PC. 1',
              time: 1626635609,
              type: 'comment'
            }
          }),

          '/v0/item/27875663.json': () => Promise.resolve({
            data: {
              by: 'jmknii',
              id: 27875663,
              parent: 27875662,
              text: 'Pre M1, I&#x27;ve always preferred a PC. 2',
              time: 1626635610,
              type: 'comment'
            }
          }),
        };

        const { pathname } = new URL(url);

        return responses[pathname]();
      }
    }),
    emitter: new EventEmitter(),
    ...overrides,
  })


describe('retrieveStories()', function () {
  it('returns event emitter', function () {
    const retrieveStories = makeFakeRetrieveStories();
    expect(retrieveStories()).toBeInstanceOf(EventEmitter);
  });

  it('emit skip on error', function (done) {
    const retrieveStories = makeFakeRetrieveStories({
      fetchItem: makeFetchItem({
        httpClient: () => Promise.reject(new Error()),
      }),
    });

    retrieveStories()
      .on('skip', (id) => {
        expect(typeof id).toBe('number');
        done();
      });
  });

  it('emit skip on null item', function (done) {
    const retrieveStories = makeFakeRetrieveStories({
      fetchItem: makeFetchItem({
        httpClient: () => Promise.resolve({ data: null }),
      }),
    });

    retrieveStories()
      .on('skip', (id) => {
        expect(typeof id).toBe('number');
        done();
      });
  });

  it('emit story type item', function (done) {
    const retrieveStories = makeFakeRetrieveStories({
      fetchItem: makeFetchItem({
        httpClient: () => Promise.resolve({
          data: {
            id: 1,
            type: 'story'
          }
        }),
      }),
    });

    retrieveStories()
      .on('story', ({ id }) => {
        expect(id).toBe(1);
        done();
      });
  });

  it('emit job type item', function (done) {
    const retrieveStories = makeFakeRetrieveStories({
      fetchItem: makeFetchItem({
        httpClient: () => Promise.resolve({
          data: {
            id: 1,
            type: 'job'
          }
        }),
      }),
    });

    retrieveStories()
      .on('job', ({ id }) => {
        expect(id).toBe(1);
        done();
      });
  });

  it('emit comment type item', function (done) {
    const retrieveStories = makeFakeRetrieveStories({
      fetchItem: makeFetchItem({
        httpClient: () => Promise.resolve({
          data: {
            id: 1,
            type: 'comment'
          }
        }),
      }),
    });

    retrieveStories()
      .on('comment', ({ id }) => {
        expect(id).toBe(1);
        done();
      });
  });

  it('fetches descendants', function (done) {
    const retrieveStories = makeFakeRetrieveStories();
    let descendants = [27875662, 27875663];
    let fetchCount = 0;

    retrieveStories()
      .on('comment', ({ id }) => {
        if (descendants.includes(id)) {
          fetchCount++;
        }

        if (fetchCount === descendants.length) {
          done();
        }
      });
  });

  it('emit finish on success', function (done) {
    const retrieveStories = makeFakeRetrieveStories();

    retrieveStories()
      .on('finish', () => {
        done();
      });
  });
});
