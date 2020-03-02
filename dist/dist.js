(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
	typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
	(global = global || self, factory(global.NuomiRequest = {}, global.axios));
}(this, (function (exports, axios$1) { 'use strict';

	axios$1 = axios$1 && axios$1.hasOwnProperty('default') ? axios$1['default'] : axios$1;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	    __assign = Object.assign || function __assign(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	                t[p[i]] = s[p[i]];
	        }
	    return t;
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	function __exportStar(m, exports) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}

	function __values(o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	}

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	function __spreadArrays() {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	}
	function __await(v) {
	    return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var g = generator.apply(thisArg, _arguments || []), i, q = [];
	    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	    function fulfill(value) { resume("next", value); }
	    function reject(value) { resume("throw", value); }
	    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	    var i, p;
	    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	    var m = o[Symbol.asyncIterator], i;
	    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	    return cooked;
	}
	function __importStar(mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result.default = mod;
	    return result;
	}

	function __importDefault(mod) {
	    return (mod && mod.__esModule) ? mod : { default: mod };
	}

	var tslib_es6 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		__extends: __extends,
		get __assign () { return __assign; },
		__rest: __rest,
		__decorate: __decorate,
		__param: __param,
		__metadata: __metadata,
		__awaiter: __awaiter,
		__generator: __generator,
		__exportStar: __exportStar,
		__values: __values,
		__read: __read,
		__spread: __spread,
		__spreadArrays: __spreadArrays,
		__await: __await,
		__asyncGenerator: __asyncGenerator,
		__asyncDelegator: __asyncDelegator,
		__asyncValues: __asyncValues,
		__makeTemplateObject: __makeTemplateObject,
		__importStar: __importStar,
		__importDefault: __importDefault
	});

	var util = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PARAM_REGEXP = /(\/:\w+)/;
	var EXT_REGEXP = /\.\w+$/;
	exports.globalWindow = typeof window !== 'undefined' ? window : commonjsGlobal;
	exports.isObject = function (obj) { return ({}.toString.call(obj) === '[object Object]'); };
	exports.isObjectLike = function (obj) { return obj && typeof obj === 'object'; };
	exports.isString = function (obj) { return typeof obj === 'string'; };
	/**
	 * @function 格式化url
	 * @param {string} url 请求url  /api /api/:id
	 * @param {object} data 请求参数
	 * @returns {string}
	 */
	exports.formatURL = function (url, data) {
	    var newUrl = '';
	    // 匹配动态参数
	    if (PARAM_REGEXP.test(url)) {
	        var params_1 = exports.isObject(data) ? data : {};
	        url.split(PARAM_REGEXP).forEach(function (path) {
	            if (path.startsWith('/:')) {
	                var key = path.substr(2);
	                newUrl += params_1[key] !== undefined ? "/" + params_1[key] : '/';
	            }
	            else {
	                newUrl += path;
	            }
	        });
	    }
	    else {
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
	exports.combineURL = function (url, extension, cache) {
	    var paramStart = url.indexOf('?');
	    var hasParam = paramStart !== -1;
	    var path = hasParam ? url.substr(0, paramStart) : url;
	    var search = hasParam ? url.substr(paramStart) : '';
	    if (extension && exports.isString(extension) && !EXT_REGEXP.test(path)) {
	        path += extension.startsWith('.') ? extension : "." + extension;
	    }
	    if (cache === false) {
	        search += (search ? '&' : '?') + "_=" + new Date().getTime();
	    }
	    return path + search;
	};

	});

	unwrapExports(util);
	var util_1 = util.globalWindow;
	var util_2 = util.isObject;
	var util_3 = util.isObjectLike;
	var util_4 = util.isString;
	var util_5 = util.formatURL;
	var util_6 = util.combineURL;

	var tslib_1 = getCjsExportFromNamespace(tslib_es6);

	var axios = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var createAxios = function (instance) {
	    instance.interceptors.request.use(function (options) {
	        var url = options.url, extension = options.extension, cache = options.cache;
	        var defaults = axios$1.default.defaults;
	        if (extension === undefined) {
	            extension = defaults['extension'];
	        }
	        if (cache === undefined) {
	            cache = defaults['cache'];
	        }
	        url = util.combineURL(url, extension, cache);
	        return tslib_1.__assign(tslib_1.__assign({}, options), { url: url });
	    });
	    return instance;
	};
	axios$1.default.create = function (options) {
	    var instance = axios$1.default.create(options);
	    return createAxios(instance);
	};
	exports.default = createAxios(axios$1.default);

	});

	unwrapExports(axios);

	var src = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	exports.axios = axios.default;
	var methods = {};
	var mocks = {};
	var MOCK_REQUEST = '__MOCK_REQUEST__';
	var request = function (method, url, data, options) {
	    var rest = [];
	    for (var _i = 4; _i < arguments.length; _i++) {
	        rest[_i - 4] = arguments[_i];
	    }
	    var newUrl = util.formatURL(url, data);
	    var req = methods[method];
	    if (!req) {
	        throw new Error("\u4E0D\u5B58\u5728\u8BF7\u6C42\u65B9\u6CD5\u201C" + method + "\u201D");
	    }
	    return req.apply(void 0, tslib_1.__spreadArrays([newUrl, data, options], rest));
	};
	/**
	 * @function 为axios配置默认值
	 * @param {object} options 配置项
	 * @returns {object}
	 */
	exports.axiosConfig = function (options) {
	    if (util.isObjectLike(options)) {
	        Object.keys(options).forEach(function (key) {
	            axios$1.default.defaults[key] = options[key];
	        });
	    }
	    return axios$1.default.defaults;
	};
	/**
	 * @function 创建mock数据
	 * @param {object} mock mock数据
	 */
	exports.createMock = function (mockData) {
	    if (util.isObjectLike(mockData)) {
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
	exports.createMethod = function (name, callback, force) {
	    var method = name.toUpperCase();
	    if (process.env.NODE_ENV !== 'production' && !force && !!methods[method]) {
	        throw new Error("\u65B9\u6CD5\u201C" + method + "\u201D\u5DF2\u5B58\u5728\uFF0C\u66FF\u6362\u8BE5\u65B9\u6CD5\u53EF\u80FD\u4F1A\u5F71\u54CD\u5DE5\u7A0B\u7684\u6B63\u5E38\u8FD0\u884C\uFF0C\u82E5\u6CA1\u6709\u98CE\u9669\uFF0C\u8BF7\u5C06force\u53C2\u6570\u8BBE\u7F6E\u4E3Atrue\uFF01");
	    }
	    // eslint-disable-next-line no-multi-assign
	    var cb = (methods[method] = callback);
	    return cb;
	};
	/**
	 * @function 创建services
	 * @param {object} api 请求api对象
	 * @param {any} mockData mock数据
	 * @returns {object}
	 */
	exports.createServices = function (api, mockData) {
	    var result = {};
	    if (util.isObjectLike(api)) {
	        var names = Object.keys(api);
	        var mock_1 = util.isObjectLike(mockData) ? mockData : {};
	        names.forEach(function (name) {
	            var array = api[name].trim().split(/\s+/);
	            var method = array[0].toUpperCase();
	            if (!methods[method]) {
	                throw new Error("\u65B9\u6CD5: " + method + " \u4E0D\u5B58\u5728");
	            }
	            var mockResponseData = mock_1[name] || mocks[name];
	            var url = array[1] || '';
	            if (process.env.NODE_ENV !== 'production' && !!mockResponseData) {
	                method = MOCK_REQUEST;
	            }
	            // eslint-disable-next-line arrow-body-style
	            result[name] = function (data, options) {
	                return request(method, url, data, options, mockResponseData);
	            };
	        });
	    }
	    return result;
	};
	if (process.env.NODE_ENV !== 'production') {
	    exports.createMethod(MOCK_REQUEST, function (url, data, options, mockResponseData) { return axios$1.default(tslib_1.__assign({ url: url,
	        data: data, adapter: function (opts) {
	            var responseData = mockResponseData;
	            if (typeof mockResponseData === 'function') {
	                responseData = mockResponseData(data, opts);
	            }
	            return new Promise(function (resolve) {
	                util.globalWindow.setTimeout(function () {
	                    resolve({
	                        data: responseData,
	                        status: 200,
	                        statusText: 'ok',
	                        config: opts,
	                        headers: opts.headers,
	                    });
	                }, opts.delay || axios$1.default.defaults['delay'] || 300);
	            });
	        } }, options)); });
	}
	['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach(function (method) {
	    exports.createMethod(method, function (url, data, options) { return axios$1.default(tslib_1.__assign(tslib_1.__assign({ url: url,
	        method: method }, options), { params: tslib_1.__assign(tslib_1.__assign({}, data), options.params) })); });
	});
	['POST', 'PUT', 'PATCH'].forEach(function (method) {
	    exports.createMethod(method, function (url, data, options) { return axios$1.default(tslib_1.__assign(tslib_1.__assign({ url: url,
	        method: method }, options), { data: util.isObject(data) ? tslib_1.__assign(tslib_1.__assign({}, data), options.data) : data })); });
	});

	});

	var index = unwrapExports(src);
	var src_1 = src.axios;
	var src_2 = src.axiosConfig;
	var src_3 = src.createMock;
	var src_4 = src.createMethod;
	var src_5 = src.createServices;

	exports.axios = src_1;
	exports.axiosConfig = src_2;
	exports.createMethod = src_4;
	exports.createMock = src_3;
	exports.createServices = src_5;
	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dist.js.map
