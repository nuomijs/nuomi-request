export * from 'axios';

declare module 'axios' {
  export interface AxiosStatic {
    method: (name: string, callback: Function) => void,
    createServices: (requests: object) => object,
    jsonp: (url: string, config?: object) => object,
    config: (options: object) => void,
  }
}
