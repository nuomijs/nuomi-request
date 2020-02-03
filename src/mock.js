import Mock from 'mockjs';

export default (mocks) => {
  const result = {};
  if(mocks && typeof mocks === 'object'){
    const mockKeys = Object.keys(mocks);
    mockKeys.forEach((key) => {
      const object = mocks[key];
      result[key] = Mock.mock(object);
    });
  }
  return result;
}