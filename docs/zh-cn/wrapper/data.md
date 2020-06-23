# data
---

返回 `Wrapper` `vm` 的 data 方法的**返回值**。如果提供了 `key`，则返回这个 `key` 对应的值。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{string} key` 可选的

* **返回值**：`{[prop: string]: any} | any`

* **示例**：

```js
import {mount} from 'san-test-utils'
import foo from './foo'

const wrapper = mount(foo, {
    data: {
        bar: 'baz'
    }
});
expect(wrapper.data().bar).toBe('baz');
expect(wrapper.data('bar')).toBe('baz');
```
