# isEmpty
---

判断 `WrapperArray` 的每个 `Wrapper` 都不包含子节点。

* **返回值**：`{boolean}`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
const divArray = wrapper.findAll('div');
expect(divArray.isEmpty()).toBe(true);
```
