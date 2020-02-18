import axios, { Method, AxiosPromise } from 'axios';
import { AxiosRequestOptions, FormatResult } from './types';
import { globalWindow, isObject, format } from './util';

export { default as axios } from './axios';

const methods = {};

const request = (
  method: string,
  url: string,
  data?: object,
  options?: AxiosRequestOptions,
  ...rest: any[]
) => {
  const result: FormatResult = format(url, data);
  return methods[method](result.url, result.data, options, ...rest);
};

/**
 * @function 为axios配置默认值
 * @param options
 */
export const axiosConfig = (options: AxiosRequestOptions) => {
  if (isObject(options)) {
    Object.keys(options).forEach((key) => {
      axios.defaults[key] = options[key];
    });
  }
  return axios.defaults;
};

/**
 * @function 创建请求方法
 * @param name
 * @param callback
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
) => {
  const method = name.toUpperCase();
  if (process.env.NODE_ENV !== 'production' && !force && !!methods[method]) {
    throw new Error(`方法“${method}”已存在，替换该方法可能会影响工程的正常运行，若没有风险，请将force参数设置为true！`);
  }
  const cb = (methods[method] = callback);
  return cb;
};

/**
 * @function 创建services
 * @param api
 * @param mockData
 */
export const createServices = (api: object, mockData?: any) => {
  const result = {};

  if (isObject(api)) {
    const names = Object.keys(api);
    const isMock = isObject(mockData);

    names.forEach((name) => {
      let [method = 'GET', url] = api[name].split(' ');
      let mockResponseData: object | Function;

      if (
        process.env.NODE_ENV !== 'production' &&
        isMock &&
        !!(mockResponseData = mockData[name])
      ) {
        method = 'MOCK-REQUEST';
      } else {
        method = method.toUpperCase();
      }

      result[name] = (data?: object, options?: AxiosRequestOptions) =>
        request(method, url, data, options, mockResponseData);
    });
  }
  return result;
};

if (process.env.NODE_ENV !== 'production') {
  createMethod('MOCK-REQUEST', (url, data, options, mockResponseData) => {
    return axios({
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
          }, opts.delay || 300);
        });
      },
      ...options,
    });
  });
}

['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      ...options,
      params: { ...data, ...options.params },
    });
  });
});

['POST', 'PUT', 'PATCH'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      ...options,
      data: isObject(data) ? { ...data, ...options.data } : data,
    });
  });
});
