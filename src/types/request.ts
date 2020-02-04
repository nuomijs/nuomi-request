export * from 'axios';

declare module 'axios' {
  export interface AxiosStatic {
    method: (name: string, callback: Function) => void,
    createServices: () => void,
    jsonp: () => void,
    config: (options: object) => void,
  }
}
