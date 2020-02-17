import axios, { AxiosRequestConfig, Method, AxiosPromise } from 'axios';
import { stringify } from 'qs';
import * as invariant from 'invariant';
import { globalWindow, isObject, formatUrl } from './util';

// axios扩展选项
interface AxiosRequestOptions extends AxiosRequestConfig {
  // 接口扩展名，.do .php等
  extension?: string;
  // 是否缓存，开启后url将带有“?_=时间戳”参数
  cache?: boolean;
  // loading控制
  loading?: boolean;
  // mock数据时延时控制，默认500ms
  delay?: number;
}

const methods = {};

/**
 * @function 为axios配置默认值
 * @param options
 */
const axiosConfig = (options: AxiosRequestOptions) => {
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
const createMethod = (
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
  invariant(
    !force && !!methods[method],
    `方法“${method}”已存在，替换该方法可能会影响工程的正常运行，若没有风险，请将force参数设置为true！`,
  );
  const cb = (methods[method] = callback);
  return cb;
};

const request = (
  method: string,
  url: string,
  data?: object,
  options?: AxiosRequestOptions,
  ...rest: any[]
) => {
  return methods[method](url, data, options, ...rest);
};

/**
 * @function 创建requests
 * @param urls
 * @param mockData
 */
const createRequests = (urls: object, mockData?: any) => {
  const requests = {};

  if (isObject(urls)) {
    const names = Object.keys(urls);
    const isMock = isObject(mockData);

    names.forEach((name) => {
      let [method = 'GET', url] = urls[name].split(' ');
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
      requests[name] = (data?: object, options?: AxiosRequestOptions) =>
          request(method, url, data, options, mockResponseData);
    });
  }
  return requests;
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
          }, opts.delay || 500);
        });
      },
      ...options,
    });
  });
}

['GET', 'DELETE'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      params: { ...data, ...options.data },
      ...options,
    });
  });
});

['POST', 'PUT'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      data: data ? stringify(data) : null,
      ...options,
    });
  });
});

createMethod('POSTJSON', (url, data, options) => {
  return axios({
    url,
    method: 'POST',
    data: { ...data, ...options.data },
    ...options,
  });
});

export { axios, axiosConfig, createMethod, createRequests };
