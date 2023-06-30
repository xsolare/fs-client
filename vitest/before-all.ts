import { beforeAll } from 'vitest';

beforeAll(() => {
  global.CSS = {
    supports: () => false,
    escape: (str: string) => str
  };
});
