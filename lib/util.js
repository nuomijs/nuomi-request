"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineURL = exports.formatURL = exports.isString = exports.isObjectLike = exports.isObject = exports.globalWindow = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var PARAM_REGEXP = /(\/:\w+)/;
var EXT_REGEXP = /\.\w+$/;
var globalWindow = typeof window !== 'undefined' ? window : global;
exports.globalWindow = globalWindow;

var isObject = function isObject(obj) {
  return {}.toString.call(obj) === "[object Object]";
};

exports.isObject = isObject;

var isObjectLike = function isObjectLike(obj) {
  return obj && _typeof(obj) === 'object';
};

exports.isObjectLike = isObjectLike;

var isString = function isString(obj) {
  return typeof obj === 'string';
};
/**
 * @function 格式化url
 * @param {string} url 请求url  /api /api/:id
 * @param {object} data 请求参数
 * @returns {string}
 */


exports.isString = isString;

var formatURL = function formatURL(url, data) {
  var newUrl = ''; // 匹配动态参数

  if (PARAM_REGEXP.test(url)) {
    var params = isObject(data) ? data : {};
    url.split(PARAM_REGEXP).forEach(function (path) {
      if (path.startsWith('/:')) {
        var key = path.substr(2);
        newUrl += params[key] !== undefined ? "/".concat(params[key]) : '/';
      } else {
        newUrl += path;
      }
    });
  } else {
    newUrl = url;
  }

  return newUrl;
};
/**
 * @function 组合url
 * @param {string} url 请求url
 * @param {string} extension 扩展符号, .do do .php php
 * @param {boolean} cache 是否缓存，设置为false将会添加"?_=时间戳"参数
 */


exports.formatURL = formatURL;

var combineURL = function combineURL(url, extension, cache) {
  var paramStart = url.indexOf('?');
  var hasParam = paramStart !== -1;
  var path = hasParam ? url.substr(0, paramStart) : url;
  var search = hasParam ? url.substr(paramStart) : '';

  if (extension && isString(extension) && !EXT_REGEXP.test(path)) {
    path += extension.startsWith('.') ? extension : ".".concat(extension);
  }

  if (cache === false) {
    search += "".concat(search ? '&' : '?', "_=").concat(new Date().getTime());
  }

  return path + search;
};

exports.combineURL = combineURL;