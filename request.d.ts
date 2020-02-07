declare module 'nuomi-request' {
  import { AxiosStatic, AxiosRequestConfig } from 'axios';

  interface CreateRequestsFunction {
    (urls: object, mockData?: any): object;
  }

  interface CreateMethodFunction {
    (name: string, callback: Function): void;
  }

  interface AxiosConfigFunction {
    (options: object): void;
  }

  export interface AxiosRequestOptions extends AxiosRequestConfig {
    loading?: boolean;
    delay?: number;
  }

  export const createRequests: CreateRequestsFunction;

  export const createMethod: CreateMethodFunction;

  export const axiosConfig: AxiosConfigFunction;

  export const axios: AxiosStatic;
}
