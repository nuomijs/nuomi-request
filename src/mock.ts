import { mock as mockjs } from 'mockjs';
import { RequestMock } from './types/mock';

let requestMock: RequestMock;

requestMock = (mocks: object): object => {
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

export default requestMock;
