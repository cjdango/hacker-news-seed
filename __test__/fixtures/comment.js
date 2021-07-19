import faker from 'faker';

export default function makeFakeComment(overrides = {}) {
  return {
    id: faker.datatype.number(),
    by: faker.internet.userName(),
    parent: faker.datatype.number(),
    ...overrides,
  }
}