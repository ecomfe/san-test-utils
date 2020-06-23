# is
---

判断是否 `Wrapper DOM` 节点或 `vm` 匹配选择器。

* **参数**：

    - `{string|Component} selector`

* **返回值**：`{boolean}`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
expect(wrapper.is('div')).toBe(true);
```
