declare module 'nuomi-request' {
  import { AxiosStatic, AxiosRequestConfig, AxiosPromise } from 'axios';

  export interface AxiosRequestOptions extends AxiosRequestConfig {
    loading?: boolean;
    delay?: number;
  }

  export interface CreateRequestsFunction {
    (urls: object, mockData?: any): object;
  }

  export interface CreateMethodFunction {
    (
      name: string,
      callback: (
        url: string,
        data?: object,
        options?: AxiosRequestOptions,
        ...rest: any[]
      ) => AxiosPromise,
      force?: boolean,
    ): void;
  }

  export interface AxiosConfigFunction {
    (options: object): void;
  }

  export const createRequests: CreateRequestsFunction;

  export const createMethod: CreateMethodFunction;

  export const axiosConfig: AxiosConfigFunction;

  export const axios: AxiosStatic;
}
