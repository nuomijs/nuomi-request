import axios, { Method, AxiosPromise } from 'axios';
import { AxiosRequestOptions } from './types';
import {
  globalWindow, isObject, isObjectLike, formatURL,
} from './util';

export { default as axios } from './axios';

const methods = {};
const mocks = {};
const MOCK_REQUEST = '__MOCK_REQUEST__';

const request = (
  method: string,
  url: string,
  data?: object,
  options?: AxiosRequestOptions,
  ...rest: any[]
) => {
  const newUrl: string = formatURL(url, data);
  const req = methods[method];
  if (!req) {
    throw new Error(`不存在请求方法“${method}”`);
  }
  return req(newUrl, data, options, ...rest);
};

/**
 * @function 为axios配置默认值
 * @param {object} options 配置项
 * @returns {object}
 */
export const axiosConfig = (options: AxiosRequestOptions): AxiosRequestOptions => {
  if (isObjectLike(options)) {
    Object.keys(options).forEach((key) => {
      axios.defaults[key] = options[key];
    });
  }
  return axios.defaults;
};

/**
 * @function 创建mock数据
 * @param {object} mock mock数据
 */
export const createMock = (mockData: object): void => {
  if (isObjectLike(mockData)) {
    Object.keys(mockData).forEach((key) => {
      mocks[key] = mockData[key];
    });
  }
};

/**
 * @function 创建请求方法
 * @param {string} name 请求方法
 * @param {function} callback 请求回调
 * @returns {function}
 */
export const createMethod = (
  name: string,
  callback: (
    url: string,
    data?: object,
    options?: AxiosRequestOptions,
    ...rest: any[]
  ) => AxiosPromise,
  force?: boolean,
): Function => {
  const method = name.toUpperCase();
  if (process.env.NODE_ENV !== 'production' && !force && !!methods[method]) {
    throw new Error(
      `方法“${method}”已存在，替换该方法可能会影响工程的正常运行，若没有风险，请将force参数设置为true！`,
    );
  }
  // eslint-disable-next-line no-multi-assign
  const cb = (methods[method] = callback);
  return cb;
};

/**
 * @function 创建services
 * @param {object} api 请求api对象
 * @param {any} mockData mock数据
 * @returns {object}
 */
export const createServices = (api: object, mockData?: any): object => {
  const result = {};

  if (isObjectLike(api)) {
    const names = Object.keys(api);
    const mock = isObjectLike(mockData) ? mockData : {};

    names.forEach((name) => {
      const array = api[name].trim().split(/\s+/);
      let method = array[0].toUpperCase();

      if (!methods[method]) {
        throw new Error(`方法: ${method} 不存在`);
      }

      const mockResponseData = mock[name] || mocks[name];
      const url = array[1] || '';

      if (process.env.NODE_ENV !== 'production' && !!mockResponseData) {
        method = MOCK_REQUEST;
      }

      // eslint-disable-next-line arrow-body-style
      result[name] = (data?: object, options?: AxiosRequestOptions) => {
        return request(method, url, data, options, mockResponseData);
      };
    });
  }
  return result;
};

if (process.env.NODE_ENV !== 'production') {
  createMethod(MOCK_REQUEST, (url, data, options, mockResponseData) => axios({
    url,
    data,
    adapter: (opts: AxiosRequestOptions) => {
      let responseData = mockResponseData;

      if (typeof mockResponseData === 'function') {
        responseData = mockResponseData(data, opts);
      }

      return new Promise((resolve) => {
        globalWindow.setTimeout(() => {
          resolve({
            data: responseData,
            status: 200,
            statusText: 'ok',
            config: opts,
            headers: opts.headers,
          });
        }, opts.delay || axios.defaults['delay'] || 300);
      });
    },
    ...options,
  }));
}

['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => axios({
    url,
    method,
    ...options,
    params: { ...data, ...options.params },
  }));
});

['POST', 'PUT', 'PATCH'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => axios({
    url,
    method,
    ...options,
    data: isObject(data) ? { ...data, ...options.data } : data,
  }));
});
