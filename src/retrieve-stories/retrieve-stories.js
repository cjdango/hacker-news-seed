import EventEmitter from 'events';

export default function makeRetrieveStories({
  fetchTopStories,
  fetchItem,
}) {
  const HNEmitter = new EventEmitter();

  function resolveItems(ids) {
    ids.forEach(async id => {
      const { data: item } = await fetchItem(id);

      if (!item) {
        console.log('item not found.')
        return;
      }

      HNEmitter.emit(item.type, item);

      if (item.kids) {
        resolveItems(item.kids)
      }
    })
  };

  return function retrieveStories() {
    fetchTopStories()
      .then(({ data: storyIDs }) => resolveItems(storyIDs));

    return HNEmitter;
  }
}