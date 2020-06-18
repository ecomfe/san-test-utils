# 配置选项
---

San Test Utils 包含了一个定义其选项的配置对象。

## stubs

* 类型：`{[name: string]: Component | boolean | string}`
* 默认值：`{}`

存储在 `config.stubs` 中的存根会被默认使用。

用到的组件存根。它们会被传入挂载选项的 `stubs` 覆写。

示例

```js
import {config} from '@baidu/san-test-utils';

config.stubs['my-component'] = '<div />';
```

## data

* 类型：`Object`
* 默认值：`{}`

默认使用传递给 config.data 的值，类似 stubs。传递给挂载选项中 data 对象的任何值都会优先于 config.data 中的同名声明。

示例

```js
import {config} from '@baidu/san-test-utils';

config.data['state'] = {
    id: 1
};
```

## methods

* 类型：`{[name: string]: Function}`
* 默认值：`{}`

你可以使用 `config` 对象配置默认的方法。它可以用于为组件注入方法的插件。你可以通过在挂载选项中传入 `methods` 来覆写 `config` 中的方法集合。

示例

```js
import {config} from '@baidu/san-test-utils';

config.methods['getData'] = () => {};
```
