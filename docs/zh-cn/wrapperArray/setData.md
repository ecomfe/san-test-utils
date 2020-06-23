# setData
---

为 `WrapperArray` 的每个 `Wrapper` `vm` 都设置数据。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{Object} data`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = mount(foo);
const barArray = wrapper.findAll(bar);
barArray.setData({foo: 'bar'});
expect(barArray.at(0).vm.data.get('foo')).toBe('bar');
```
