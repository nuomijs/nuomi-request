import axios from 'axios';
import * as warning from 'warning';
import { mock as mockjs } from 'mockjs';

const methods = {};

const defaultMethodsKeys = ['get', 'post', 'delete', 'head', 'options', 'put', 'patch'];

const axiosConfig = () => {};

const createMock = (mocks: object): object => {
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

const createMethod = (name: string, callback: Function) => {
  warning(defaultMethodsKeys.includes(name), `方法“${name}”已存在`);
  methods[name] = callback;
};

const createServices = (requests: object) => {
  const services = {};

  return services;
};

export {
  axios,
  axiosConfig,
  createMock,
  createMethod,
  createServices,
};
