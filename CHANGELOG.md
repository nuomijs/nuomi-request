# 更新日志：

## 1.1.0 (2020-02-06)
* 考虑到mockjs会被打包到项目中，需要对webpack做额外的处理，因此移除内置mockjs模块，若想使用mockjs，需手动安装使用
* createServices传入mockData支持函数
```js
import { mock } from 'mockjs';

createServices({
  submit: '/path/submit:post',
  getdata: '/path/getdata:get',
}, {
  submit: (data) => {
    if(data.username === 'xxx'){
      return mock({
        data: {
          'list|1-10': [{
            'id|+1': 1,
          }],
        },
        status: 200,
      })
    }
    return {
      data: {},
      message: '用户名错误',
      status: 300,
    }
  },
  getdata: mock({
    data: {
      'list|1-10': [{
        'id|+1': 1,
      }],
    },
    status: 200,
  }),
})
```


## 1.0.1 (2020-02-06)
包含如下4个API
* createServices
* createMethod
* axiosConfig
* axios
