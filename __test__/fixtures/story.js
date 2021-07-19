import faker from 'faker';

export default function makeFakeStory(overrides = {}) {
  return {
    id: faker.datatype.number(),
    by: faker.internet.userName(),
    ...overrides,
  }
}