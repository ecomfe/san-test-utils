# isEmpty
---

断言 `Wrapper` 是不是包含子节点。

* **返回值**：`{boolean}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
expect(wrapper.isEmpty()).toBe(true);
```
