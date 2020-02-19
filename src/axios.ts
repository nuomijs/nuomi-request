import axios, { AxiosInstance } from 'axios';
import { AxiosRequestOptions } from './types';
import { combineURL } from './util';

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
