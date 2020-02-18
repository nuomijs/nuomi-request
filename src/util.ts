import { FormatResult } from './types';

const PARAM_REGEXP = /(:\w+)/;
const EXT_REGEXP = /\.\w+$/;
const SLASH_REGEXP = /\/+$/;

export const globalWindow = typeof window !== 'undefined' ? window : global;

export const isObject = (obj: any) => {
  return {}.toString.call(obj) === `[object Object]`;
};

export const isString = (obj: any): boolean => typeof obj === 'string';

export const format = (url: string, data: object): FormatResult => {
  let newUrl = '';

  // 匹配动态参数
  if (PARAM_REGEXP.test(url)) {
    url.split(PARAM_REGEXP).forEach((path) => {
      if (path.startsWith(':')) {
        const key = path.substr(1);
        newUrl += data[key] !== undefined ? data[key] : '';
      } else {
        newUrl += path;
      }
    });
  } else {
    newUrl = url;
  }

  return { url: newUrl, data };
};

export const combineURL = (url: string, extension?: string, cache?: boolean): string => {
  const paramStart = url.indexOf('?');
  const hasParam = paramStart !== -1;
  let path = hasParam ? url.substr(0, paramStart) : url;
  let search = hasParam ? url.substr(paramStart) : '';

  path = path.replace(SLASH_REGEXP, '');

  if (extension && isString(extension) && !EXT_REGEXP.test(path)) {
    path += extension.startsWith('.') ? extension : `.${extension}`;
  }

  if (cache === false) {
    search += `${search ? '&' : '?'}_=${new Date().getTime()}`;
  }

  return path + search;
};
