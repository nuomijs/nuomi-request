import axios, { AxiosRequestConfig, Method, AxiosPromise } from 'axios';
import { mock as Mock } from 'mockjs';
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
 * @function 创建mock数据
 * @param originalMockData 原始mock对象
 */
const getMockData = (originalMockData: object) => {
  const mockData = {};
  if (isObject(originalMockData)) {
    Object.keys(originalMockData).forEach((key) => {
      const object = originalMockData[key];
      const data = Mock(object);
      mockData[key] = data;
    });
  }
  return mockData;
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
 * @function 创建services
 * @param requests
 * @param originalMockData
 */
const createServices = (requests: object, originalMockData?: any) => {
  const services = {};
  if (isObject(requests)) {
    const names = Object.keys(requests);
    let mockData: object = {};
    if (process.env.NODE_ENV !== 'production' && isObject(originalMockData)) {
      mockData = getMockData(originalMockData);
    }
    names.forEach((name) => {
      const [url, method = 'get'] = requests[name].split(':');
      const mockResponseData = mockData[name];
      if (process.env.NODE_ENV !== 'production' && !!mockResponseData) {
        services[name] = (data?: object, options?: AxiosRequestOptions) =>
          axios({
            url,
            data,
            adapter: (opts: AxiosRequestOptions) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    data: mockResponseData,
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
        services[name] = (data?: object, options?: AxiosRequestOptions) =>
          methods[method](url, data, options);
      }
    });
  }
  return services;
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

export { axios, axiosConfig, createMethod, createServices };
