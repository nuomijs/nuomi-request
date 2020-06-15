import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { combineURL } from './util';

// axios扩展选项
export interface AxiosRequestOptions extends AxiosRequestConfig {
  // 接口扩展名，.do .php等
  extension?: string;
  // 是否缓存，开启后url将带有“?_=时间戳”参数
  cache?: boolean;
  // mock数据时延时控制，默认300ms
  delay?: number;
}

const createAxios = <T extends AxiosInstance>(instance: T): T => {
  instance.interceptors.request.use(
    (options: AxiosRequestOptions): AxiosRequestOptions => {
      let { url, extension, cache } = options;
      const { defaults } = axios;

      if (extension === undefined) {
        extension = defaults['extension'];
      }

      if (cache === undefined) {
        cache = defaults['cache'];
      }

      url = combineURL(url, extension, cache);
      return { ...options, url };
    },
  );
  return instance;
};

axios.create = (options: AxiosRequestOptions): AxiosInstance => {
  const instance = axios.create(options);
  return createAxios(instance);
};

export default createAxios(axios);
