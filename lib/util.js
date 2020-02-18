"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineURL = exports.format = exports.isString = exports.isObject = exports.globalWindow = void 0;
var PARAM_REGEXP = /(:\w+)/;
var EXT_REGEXP = /\.\w+$/;
var SLASH_REGEXP = /\/+$/;
var globalWindow = typeof window !== 'undefined' ? window : global;
exports.globalWindow = globalWindow;

var isObject = function isObject(obj) {
  return {}.toString.call(obj) === "[object Object]";
};

exports.isObject = isObject;

var isString = function isString(obj) {
  return typeof obj === 'string';
};

exports.isString = isString;

var format = function format(url, data) {
  var newUrl = ''; // 匹配动态参数

  if (PARAM_REGEXP.test(url)) {
    url.split(PARAM_REGEXP).forEach(function (path) {
      if (path.startsWith(':')) {
        var key = path.substr(1);
        newUrl += data[key] !== undefined ? data[key] : '';
      } else {
        newUrl += path;
      }
    });
  } else {
    newUrl = url;
  }

  return {
    url: newUrl,
    data: data
  };
};

exports.format = format;

var combineURL = function combineURL(url, extension, cache) {
  var paramStart = url.indexOf('?');
  var hasParam = paramStart !== -1;
  var path = hasParam ? url.substr(0, paramStart) : url;
  var search = hasParam ? url.substr(paramStart) : '';
  path = path.replace(SLASH_REGEXP, '');

  if (extension && isString(extension) && !EXT_REGEXP.test(path)) {
    path += extension.startsWith('.') ? extension : ".".concat(extension);
  }

  if (cache === false) {
    search += "".concat(search ? '&' : '?', "_=").concat(new Date().getTime());
  }

  return path + search;
};

exports.combineURL = combineURL;