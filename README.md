# nuomi-request
基于axios+mockjs封装的请求库
# 安装
```
yarn add nuomi-request
```

# 使用
```js
// config.js
import { axiosConfig } from 'nuomi-request';

// 公共配置
axiosConfig({
  baseURL: '/',
});


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


// services.js
import { createServices } from 'nuomi-request';
import mock from './mock';

export default createServices({
  getList: 'path/getList:post'
}, process.env.NODE_ENV !== 'production' ? mock : null);


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
