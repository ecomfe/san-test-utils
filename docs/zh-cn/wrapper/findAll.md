# findAll
---

返回一个 `WrapperArray`。

可以使用任何有效的[选择器](../api/selector.md)。

* **参数**：

    - `{string|Component} selector`

* **返回值**：`{WrapperArray}`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = mount(foo);
const div = wrapper.findAll('div').at(0);
expect(div.is('div')).toBe(true);
const bar = wrapper.findAll(bar).at(0);
expect(bar.is(bar)).toBe(true);
```
