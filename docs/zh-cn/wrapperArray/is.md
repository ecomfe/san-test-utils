# is
---

判断 `WrapperArray` 的每个 `Wrapper` 是否 DOM 节点或 `vm` 匹配选择器。

* **参数**：

    - `{string|Component} selector`

* **返回值**：`{boolean}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
const divArray = wrapper.find('div');
expect(divArray.is('div')).toBe(true);
```
