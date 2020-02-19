"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createAxios = function createAxios(instance) {
  instance.interceptors.request.use(function (options) {
    var url = options.url,
        extension = options.extension,
        cache = options.cache;
    var defaults = _axios.default.defaults;

    if (extension === undefined) {
      extension = defaults['extension'];
    }

    if (cache === undefined) {
      cache = defaults['cache'];
    }

    url = (0, _util.combineURL)(url, extension, cache);
    return _objectSpread({}, options, {
      url: url
    });
  });
  return instance;
};

_axios.default.create = function (options) {
  var instance = _axios.default.create(options);

  return createAxios(instance);
};

var _default = createAxios(_axios.default);

exports.default = _default;