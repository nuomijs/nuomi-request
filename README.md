# nuomi-request
axios+jsonp+mock封装的请求库
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
import request from 'nuomi-request';
import mock from './mock';

// 公共配置
request.config({
    // 接口前缀
    base: '/',
    // 接口后缀
    suffix: '.do',
    // mock平台url
    mock: 'http://xxx/api/',
    // 可传入mock对象进行自定义mock
    mock: mock,
    // 请求前，可做拦截
    before(){},
    // 请求结束，可做拦截
    after(){},
});


// services.js
import request from 'nuomi-request';

export default request({
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
