import axios from 'axios';
import jsonp from 'jsonp';

function request(requests) {}

const defaultOptions = {};

const types = {};

request.add = function(type, callback) {
  types[type] = callback;
};

request.config = function(options) {};

export default request;
