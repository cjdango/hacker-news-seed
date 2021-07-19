export const makeColumns = (item) => {
  const values = Object.keys(item);
  return values.join();
}

export const makeValues = (item) => {
  const values = Object.values(item);

  const template = values
    .map((_, idx) => `$${idx + 1}`)
    .join();

  return [template, values]
}