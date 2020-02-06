import axios, { AxiosRequestConfig } from 'axios';
import * as warning from 'warning';
import { mock as mockjs } from 'mockjs';

interface Config extends AxiosRequestConfig {
  loading?: boolean;
  delay?: number;
}

const methods = {};

const axiosConfig = (options: object) => {
  Object.keys(options).forEach((key) => {
    axios.defaults[key] = options[key];
  });
};

const createMock = (mocks: object) => {
  const result = {};
  if (mocks && typeof mocks === 'object') {
    const mockKeys = Object.keys(mocks);
    mockKeys.forEach((key) => {
      const object = mocks[key];
      const data = mockjs(object);
      result[key] = data;
    });
  }
  return result;
};

const createMethod = (name: string, callback: Function) => {
  warning(!!methods[name], `方法“${name}”已存在`);
  const cb = (methods[name] = callback);
  return cb;
};

const createServices = (requests: object, mockData?: any) => {
  const services = {};
  const names = Object.keys(requests);
  let mockResult: object = {};
  if (process.env.NODE_ENV !== 'production' && !!mockData && typeof mockData === 'object') {
    mockResult = createMock(mockData);
  }
  names.forEach((name) => {
    const [url, method = 'get'] = requests[name].split(':');
    const mockResponseData = mockResult[name];
    if (!!mockResponseData) {
      services[name] = (data?: object, config?: Config) =>
        axios({
          url,
          data,
          adapter: (conf: Config) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  data: mockResponseData,
                  status: 200,
                  statusText: 'ok',
                  config: conf,
                  headers: conf.headers,
                });
              }, conf.delay || 500);
            });
          },
          ...config,
        });
    } else {
      services[name] = (data?: object, config?: Config) =>
        methods[method](url, data, config);
    }
  });
  return services;
};

['get', 'post'].forEach((method: string) => {
  createMethod(method, (url: string, data?: object, config?: Config) => {
    return axios({
      url,
      method: 'get',
      [method === 'get' ? 'params' : 'data']: data,
      ...config,
    });
  });
});

export { axios, axiosConfig, createMethod, createServices };
