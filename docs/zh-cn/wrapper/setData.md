# setData
---

设置 `Wrapper` `vm` 的 `data`。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{Object} data`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
wrapper.setData({foo: 'bar'});
expect(wrapper.vm.data.get('foo')).toBe('bar');
```
