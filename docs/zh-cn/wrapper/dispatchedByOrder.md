# dispatchedByOrder
---

返回一个包含由 `Wrapper` `vm` 触发的自定义消息的数组。

* **返回值**：`Array<{name: string, args: Array<any>}>`

* **示例**：

```js
import {attach} from 'san-test-utils';

const wrapper = attach(component);

wrapper.vm.dispatch('foo');
wrapper.vm.dispatch('bar', 123);

/*
`wrapper.dispatchdByOrder() 返回如下数组：
[
  {name: 'foo', args: []},
  {name: 'bar', args: [123]}
]
*/

// 断言事件的触发顺序
expect(wrapper.dispatchdByOrder().map(e => e.name)).toEqual(['foo', 'bar']);
```
