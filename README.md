# nuomi-request
基于axios封装的请求库
# 安装
```
yarn add nuomi-request
```

# 使用
```js
// mock.js
export default {
    // 自定义mock
    getList: {
        'status': 200,
        'data|100': [{
            'id|+1': 1,
        }],
    },
}

// config.js
import { axiosConfig, createMock } from 'nuomi-request';
import mock from './mock';

// 公共配置
if(process.env.NODE_ENV !== 'production') {
  // mock平台url
  createMock('http://xxx/api/');
  // or 自定义mock
  createMock(mock);
}

axiosConfig({
  // 接口前缀
  baseURL: '/',
  // 接口后缀
  suffix: '.do',
});

// services.js
import { createServices } from 'nuomi-request';

export default createServices({
    getList: 'path/getList:post'
});

// effects.js
import services from './services';

export default {
    async getList(){
        const data = await services.getList();
        this.disptach({
            type: '_updateState',
            payload: {
                data,
            }
        });
    }
};
```
