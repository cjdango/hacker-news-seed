import faker from 'faker';

export default function makeFakeJob(overrides = {}) {
  return {
    id: faker.datatype.number(),
    by: faker.internet.userName(),
    ...overrides,
  }
}