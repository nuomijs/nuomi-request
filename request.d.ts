declare module 'nuomi-request' {
  import { AxiosStatic, AxiosRequestConfig } from 'axios';

  interface CreateServices {
    (requests: object, mockData?: any): object;
  }

  interface CreateMethod {
    (name: string, callback: Function): void;
  }

  interface AxiosConfig {
    (options: object): void;
  }

  export interface AxiosRequestOptions extends AxiosRequestConfig {
    loading?: boolean;
    delay?: number;
  }

  export const createServices: CreateServices;

  export const createMethod: CreateMethod;

  export const axiosConfig: AxiosConfig;

  export const axios: AxiosStatic;
}
