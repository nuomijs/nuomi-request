import axios, { AxiosRequestConfig, Method } from 'axios';
import { mock as Mock } from 'mockjs';
import { stringify } from 'qs';

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
      const data = Mock(object);
      result[key] = data;
    });
  }
  return result;
};

const createMethod = (name: string, callback: Function) => {
  if (process.env.NODE_ENV !== 'production' && !!methods[name]) {
    console.warn(`方法“${name}”已存在，若对项目没有影响，请忽略该警告！`);
  }
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
    if (process.env.NODE_ENV !== 'production' && !!mockResponseData) {
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
      services[name] = (data?: object, config?: Config) => methods[method](url, data, config);
    }
  });
  return services;
};

['get', 'delete'].forEach((method: Method) => {
  createMethod(method, (url: string, data?: object, config?: Config) => {
    return axios({
      url,
      method,
      params: data,
      ...config,
    });
  });
});

['post', 'put'].forEach((method: Method) => {
  createMethod(method, (url: string, data?: object, config?: Config) => {
    return axios({
      url,
      method,
      data: stringify(data),
      ...config,
    });
  });
});

createMethod('postJSON', (url: string, data?: object, config?: Config) => {
  return axios({
    url,
    method: 'post',
    data: data,
    ...config,
  });
});

export { axios, axiosConfig, createMethod, createServices };
