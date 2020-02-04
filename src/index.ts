import axios from 'axios';
const jsonp = require('jsonp');
import { AxiosStatic } from './types/request';

const request: AxiosStatic = axios;

const defaultOptions = {};

const methods = {};

request.method = function(name: string, callback: Function) {
  methods[name] = callback;
};

request.config = function(options: object) {};

request.createServices = () => {};

request.jsonp = () => {};

export default request;
