# contains
---

判断 `WrapperArray` 的每个包裹器都包含选择器。

可使用任何有效的[选择器](../api/selector.md)。

* **参数**：

    - `{string|Component} selector`

* **返回值**：`{boolean}`

* **示例**：

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = shallowMount(foo);
const divArray = wrapper.findAll('div');
expect(divArray.contains('p')).toBe(true);
expect(divArray.contains(bar)).toBe(true);
```
