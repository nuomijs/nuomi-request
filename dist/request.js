(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'axios', 'qs'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('axios'), require('qs'));
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.axios, global.qs);
    global.request = mod.exports;
  }
})(
  typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this,
  function(_exports, _axios, _qs) {
    'use strict';

    Object.defineProperty(_exports, '__esModule', {
      value: true,
    });
    Object.defineProperty(_exports, 'axios', {
      enumerable: true,
      get: function get() {
        return _axios.default;
      },
    });
    _exports.createRequests = _exports.createMethod = _exports.axiosConfig = void 0;
    _axios = _interopRequireDefault(_axios);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }

    function _nonIterableRest() {
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }

    function _iterableToArrayLimit(arr, i) {
      if (
        !(
          Symbol.iterator in Object(arr) ||
          Object.prototype.toString.call(arr) === '[object Arguments]'
        )
      ) {
        return;
      }
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i['return'] != null) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    var methods = {};

    var isObject = function isObject(obj) {
      return {}.toString.call(obj) === '[object Object]';
    };
    /**
     * @function 为axios配置默认值
     * @param options
     */

    var axiosConfig = function axiosConfig(options) {
      if (isObject(options)) {
        Object.keys(options).forEach(function(key) {
          _axios.default.defaults[key] = options[key];
        });
      }

      return _axios.default.defaults;
    };
    /**
     * @function 创建请求方法
     * @param name
     * @param callback
     */

    _exports.axiosConfig = axiosConfig;

    var createMethod = function createMethod(name, callback) {
      if (process.env.NODE_ENV !== 'production' && !!methods[name]) {
        console.warn(
          '\u65B9\u6CD5\u201C'.concat(
            name,
            '\u201D\u5DF2\u5B58\u5728\uFF0C\u82E5\u5BF9\u9879\u76EE\u6CA1\u6709\u5F71\u54CD\uFF0C\u8BF7\u5FFD\u7565\u8BE5\u8B66\u544A\uFF01',
          ),
        );
      }

      var cb = (methods[name] = callback);
      return cb;
    };
    /**
     * @function 创建requests
     * @param urls
     * @param mockData
     */

    _exports.createMethod = createMethod;

    var createRequests = function createRequests(urls, mockData) {
      var requests = {};

      if (isObject(urls)) {
        var names = Object.keys(urls);
        var isMock = isObject(mockData);
        names.forEach(function(name) {
          var _urls$name$split = urls[name].split(':'),
            _urls$name$split2 = _slicedToArray(_urls$name$split, 2),
            url = _urls$name$split2[0],
            _urls$name$split2$ = _urls$name$split2[1],
            method = _urls$name$split2$ === void 0 ? 'get' : _urls$name$split2$;

          var mockResponseData;

          if (
            process.env.NODE_ENV !== 'production' &&
            isMock &&
            !!(mockResponseData = mockData[name])
          ) {
            requests[name] = function(data, options) {
              return (0, _axios.default)(
                _objectSpread(
                  {
                    url: url,
                    data: data,
                    adapter: function adapter(opts) {
                      var responseData = mockResponseData;

                      if (typeof mockResponseData === 'function') {
                        responseData = mockResponseData(data, opts);
                      }

                      return new Promise(function(resolve) {
                        setTimeout(function() {
                          resolve({
                            data: responseData,
                            status: 200,
                            statusText: 'ok',
                            config: opts,
                            headers: opts.headers,
                          });
                        }, opts.delay || 500);
                      });
                    },
                  },
                  options,
                ),
              );
            };
          } else {
            requests[name] = function(data, options) {
              return methods[method](url, data, options);
            };
          }
        });
      }

      return requests;
    };

    _exports.createRequests = createRequests;
    ['get', 'delete'].forEach(function(method) {
      createMethod(method, function(url, data, options) {
        return (0, _axios.default)(
          _objectSpread(
            {
              url: url,
              method: method,
              params: data,
            },
            options,
          ),
        );
      });
    });
    ['post', 'put'].forEach(function(method) {
      createMethod(method, function(url, data, options) {
        return (0, _axios.default)(
          _objectSpread(
            {
              url: url,
              method: method,
              data: (0, _qs.stringify)(data),
            },
            options,
          ),
        );
      });
    });
    createMethod('postJSON', function(url, data, options) {
      return (0, _axios.default)(
        _objectSpread(
          {
            url: url,
            method: 'post',
            data: data,
          },
          options,
        ),
      );
    });
  },
);
