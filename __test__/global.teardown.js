import { closeDB } from './fixtures/db'

export default async function teardown() {
  return closeDB();
}