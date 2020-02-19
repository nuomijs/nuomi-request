import { AxiosRequestConfig } from 'axios';

// axios扩展选项
export interface AxiosRequestOptions extends AxiosRequestConfig {
  // 接口扩展名，.do .php等
  extension?: string;
  // 是否缓存，开启后url将带有“?_=时间戳”参数
  cache?: boolean;
  // mock数据时延时控制，默认300ms
  delay?: number;
}
