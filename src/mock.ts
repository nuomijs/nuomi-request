import { mock as mockjs } from 'mockjs';

export default (mocks: object) => {
  const result: object = {};
  if (mocks && typeof mocks === 'object') {
    const mockKeys = Object.keys(mocks);
    mockKeys.forEach((key: string) => {
      const object: object = mocks[key];
      result[key] = mockjs(object);
    });
  }
  return result;
};
