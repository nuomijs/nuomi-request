"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "axios", {
  enumerable: true,
  get: function get() {
    return _axios2.default;
  }
});
exports.createServices = exports.createMethod = exports.createMock = exports.axiosConfig = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _util = require("./util");

var _axios2 = _interopRequireDefault(require("./axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = {};
var mocks = {};
var MOCK_REQUEST = '__MOCK_REQUEST__';

var request = function request(method, url, data, options) {
  var newUrl = (0, _util.formatURL)(url, data);
  var req = methods[method];

  if (!req) {
    throw new Error("\u4E0D\u5B58\u5728\u8BF7\u6C42\u65B9\u6CD5\u201C".concat(method, "\u201D"));
  }

  for (var _len = arguments.length, rest = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    rest[_key - 4] = arguments[_key];
  }

  return req.apply(void 0, [newUrl, data, options].concat(rest));
};
/**
 * @function 为axios配置默认值
 * @param {object} options 配置项
 * @returns {object}
 */


var axiosConfig = function axiosConfig(options) {
  if ((0, _util.isObjectLike)(options)) {
    Object.keys(options).forEach(function (key) {
      _axios.default.defaults[key] = options[key];
    });
  }

  return _axios.default.defaults;
};
/**
 * @function 创建mock数据
 * @param {object} mock mock数据
 */


exports.axiosConfig = axiosConfig;

var createMock = function createMock(mockData) {
  if ((0, _util.isObjectLike)(mockData)) {
    Object.keys(mockData).forEach(function (key) {
      mocks[key] = mockData[key];
    });
  }
};
/**
 * @function 创建请求方法
 * @param {string} name 请求方法
 * @param {function} callback 请求回调
 * @returns {function}
 */


exports.createMock = createMock;

var createMethod = function createMethod(name, callback, force) {
  var method = name.toUpperCase();

  if (process.env.NODE_ENV !== 'production' && !force && !!methods[method]) {
    throw new Error("\u65B9\u6CD5\u201C".concat(method, "\u201D\u5DF2\u5B58\u5728\uFF0C\u66FF\u6362\u8BE5\u65B9\u6CD5\u53EF\u80FD\u4F1A\u5F71\u54CD\u5DE5\u7A0B\u7684\u6B63\u5E38\u8FD0\u884C\uFF0C\u82E5\u6CA1\u6709\u98CE\u9669\uFF0C\u8BF7\u5C06force\u53C2\u6570\u8BBE\u7F6E\u4E3Atrue\uFF01"));
  } // eslint-disable-next-line no-multi-assign


  var cb = methods[method] = callback;
  return cb;
};
/**
 * @function 创建services
 * @param {object} api 请求api对象
 * @param {any} mockData mock数据
 * @returns {object}
 */


exports.createMethod = createMethod;

var createServices = function createServices(api, mockData) {
  var result = {};

  if ((0, _util.isObjectLike)(api)) {
    var names = Object.keys(api);
    var mock = (0, _util.isObjectLike)(mockData) ? mockData : {};
    names.forEach(function (name) {
      var array = api[name].trim().split(/\s+/);
      var method = array[0].toUpperCase();

      if (!methods[method]) {
        throw new Error("\u65B9\u6CD5: ".concat(method, " \u4E0D\u5B58\u5728"));
      }

      var mockResponseData = mock[name] || mocks[name];
      var url = array[1] || '';

      if (process.env.NODE_ENV !== 'production' && !!mockResponseData) {
        method = MOCK_REQUEST;
      } // eslint-disable-next-line arrow-body-style


      result[name] = function (data, options) {
        return request(method, url, data, options, mockResponseData);
      };
    });
  }

  return result;
};

exports.createServices = createServices;

if (process.env.NODE_ENV !== 'production') {
  createMethod(MOCK_REQUEST, function (url, data, options, mockResponseData) {
    return (0, _axios.default)(_objectSpread({
      url: url,
      data: data,
      adapter: function adapter(opts) {
        var responseData = mockResponseData;

        if (typeof mockResponseData === 'function') {
          responseData = mockResponseData(data, opts);
        }

        return new Promise(function (resolve) {
          _util.globalWindow.setTimeout(function () {
            resolve({
              data: responseData,
              status: 200,
              statusText: 'ok',
              config: opts,
              headers: opts.headers
            });
          }, opts.delay || _axios.default.defaults['delay'] || 300);
        });
      }
    }, options));
  });
}

['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach(function (method) {
  createMethod(method, function (url, data, options) {
    return (0, _axios.default)(_objectSpread({
      url: url,
      method: method
    }, options, {
      params: _objectSpread({}, data, {}, options.params)
    }));
  });
});
['POST', 'PUT', 'PATCH'].forEach(function (method) {
  createMethod(method, function (url, data, options) {
    return (0, _axios.default)(_objectSpread({
      url: url,
      method: method
    }, options, {
      data: (0, _util.isObject)(data) ? _objectSpread({}, data, {}, options.data) : data
    }));
  });
});