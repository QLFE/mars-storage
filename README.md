# mars-storage [![NPM version][npm-image]][npm-url]

storage 封装，支持 localStorage 和 sessionStorage, 支持命名空间，对象存储，设置过期时间等。

## 安装

```bash
$ npm install mars-storage --save
```

## 使用方法
```
import Storage from 'mars-storage';

const storage = new Storage({
  type: 'sessionStorage',
  prefix: '__uzone__'
});

storage.set('data', {
  code: '1234546'
});


storage.get('data'); // {code: '123456'}
```

## 文档

### 配置
```
const storage = new Storage({
  type: 'sessionStorage', //
  prefix: '__uzone__' // namespace 前缀
});
```
可配置项：
- type：支持 sessionStorage/localStorage, 默认 localStorage
- prefix：key 前缀，作为命名空间使用，默认__storage__

### API
#### set(key, value, expire) 设置对应键值

- key: 存储键值
- value: 存储值，可以为任何类型
- expire: 过期时间，单位为毫秒


#### get(key) 获取对应键值

- key: 存储键值

#### remove(key) 删除对应键

- key: 存储键值

#### removeAll() 删除所有键值

#### removeExpired() 移除所有过期值

[npm-image]: https://badge.fury.io/js/generator-vapp.svg
[npm-url]: https://npmjs.org/package/mars-storage