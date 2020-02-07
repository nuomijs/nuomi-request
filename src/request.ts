import axios, { AxiosRequestConfig, Method, AxiosPromise } from 'axios';
import { stringify } from 'qs';

// axios扩展选项
interface AxiosRequestOptions extends AxiosRequestConfig {
  // loading控制
  loading?: boolean;
  // mock数据时延时控制，默认500ms
  delay?: number;
}

const methods = {};

const isObject = (obj: any) => {
  return {}.toString.call(obj) === `[object Object]`;
};

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
  callback: (url: string, data?: object, options?: AxiosRequestOptions) => AxiosPromise,
) => {
  if (process.env.NODE_ENV !== 'production' && !!methods[name]) {
    console.warn(`方法“${name}”已存在，若对项目没有影响，请忽略该警告！`);
  }
  const cb = (methods[name] = callback);
  return cb;
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
      const [url, method = 'get'] = urls[name].split(':');
      let mockResponseData: object | Function;
      if (
        process.env.NODE_ENV !== 'production' &&
        isMock &&
        !!(mockResponseData = mockData[name])
      ) {
        requests[name] = (data?: object, options?: AxiosRequestOptions) =>
          axios({
            url,
            data,
            adapter: (opts: AxiosRequestOptions) => {
              let responseData = mockResponseData;
              if (typeof mockResponseData === 'function') {
                responseData = mockResponseData(data, opts);
              }
              return new Promise((resolve) => {
                setTimeout(() => {
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
      } else {
        requests[name] = (data?: object, options?: AxiosRequestOptions) =>
          methods[method](url, data, options);
      }
    });
  }
  return requests;
};

['get', 'delete'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      params: data,
      ...options,
    });
  });
});

['post', 'put'].forEach((method: Method) => {
  createMethod(method, (url, data, options) => {
    return axios({
      url,
      method,
      data: stringify(data),
      ...options,
    });
  });
});

createMethod('postJSON', (url, data, options) => {
  return axios({
    url,
    method: 'post',
    data: data,
    ...options,
  });
});

export { axios, axiosConfig, createMethod, createRequests };
