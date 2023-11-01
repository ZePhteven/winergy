import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const mockedRepositoryFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  search: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

export const MockedRepositoryClass = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));
