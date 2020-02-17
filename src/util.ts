export const globalWindow = typeof window !== 'undefined' ? window : global;

export const isObject = (obj: any) => {
  return {}.toString.call(obj) === `[object Object]`;
};

export const formatUrl = (path: string, data: object): string => {
  return path;
};
