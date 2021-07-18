export default function makeRetrieveStories({
  fetchTopStories,
  fetchItem,
  emitter,
}) {
  function resolveItems(ids) {
    return Promise.allSettled(ids.map(async id => {
      const [{ data: item }, err] = await fetchItem(id);

      if (err) {
        emitter.emit('skip', id);
        return;
      }

      if (!item) {
        emitter.emit('skip', id);
        return;
      }

      emitter.emit(item.type, item);

      if (item.kids) {
        await resolveItems(item.kids)
      }
    }));
  };

  return function retrieveStories() {
    fetchTopStories()
      .then(async ([response, err]) => {
        if (err) {
          return console.error(err);
        }

        await resolveItems(response.data);
        emitter.emit('finish');
      })

    return emitter;
  }
}