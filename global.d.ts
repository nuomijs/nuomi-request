declare module 'nuomi-request' {
  import { AxiosStatic } from 'axios';

  interface CreateMock {
    (mocks: object): object,
  }

  interface CreateServices {
    (requests: object): object,
  }

  interface CreateMethod {
    (name: string, callback: Function): void,
  }

  interface AxiosConfig {
    (options: object): void,
  }

  export const createMock: CreateMock;

  export const createServices: CreateServices;

  export const createMethod: CreateMethod;

  export const axiosConfig: AxiosConfig;

  export const axios: AxiosStatic;
}
