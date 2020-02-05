import axios from 'axios';
import * as warning from 'warning';
import { AxiosStatic } from './types/request';

const request: AxiosStatic = axios;

const defaultOptions: object = {};

const methods: object = {};

const defaultMethodsKeys: string[] = ['get', 'post', 'delete', 'head', 'options', 'put', 'patch'];

request.method = function(name: string, callback: Function) {
  warning(defaultMethodsKeys.includes(name), `方法“${name}”已存在`);
  methods[name] = callback;
};

request.config = function(options: object) {};

request.createServices = (requests: object) => {
  const services = {};

  return services;
};

export default request;
