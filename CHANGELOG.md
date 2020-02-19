# 更新日志：

## 0.2.0 (2020-02-19)
* createRequests更名为createServices
* 新增createMock方法
* api path规则更改
```js
{ save: '/api/save:post' }
// 变更为
{ save: 'POST /api/save' }

// 支持动态参数
{ save: 'POST /api/save/:id' }
```
* 移除postJSON方法，新增HEAD、OPTIONS、PATCH方法

## 0.1.0 (2020-02-07)
包含如下4个API
* createRequests
* createMethod
* axiosConfig
* axios
