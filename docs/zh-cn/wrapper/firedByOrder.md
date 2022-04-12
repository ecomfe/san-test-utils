# firedByOrder
---

返回一个包含由 `Wrapper` `vm` 触发的自定义事件的数组。

* **返回值**：`Array<{name: string, args: Array<any>}>`

* **示例**：

```js
import {attach} from 'san-test-utils';

const wrapper = attach(component);

wrapper.vm.fire('foo');
wrapper.vm.fire('bar', 123);

/*
`wrapper.firedByOrder() 返回如下数组：
[
  {name: 'foo', args: []},
  {name: 'bar', args: [123]}
]
*/

// 断言事件的触发顺序
expect(wrapper.firedByOrder().map(e => e.name)).toEqual(['foo', 'bar']);
```
