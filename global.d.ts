declare module 'nuomi-request' {
  import { AxiosStatic, AxiosRequestConfig, AxiosPromise } from 'axios';

  export interface AxiosRequestOptions extends AxiosRequestConfig {
    extension?: string;
    cache?: boolean;
    delay?: number;
  }

  export const createServices: (urls: object, mockData?: any) => object;

  export const createMethod: (
    name: string,
    callback: (
      url: string,
      data?: object,
      options?: AxiosRequestOptions,
      ...rest: any[]
    ) => AxiosPromise,
    force?: boolean,
  ) => void;

  export const createMock: (mockData: object) => void;

  export const axiosConfig: (options: object) => void;

  export const axios: AxiosStatic;
}
