# isSanInstance
---

判断 `WrapperArray` 的每个 `Wrapper` 都是 San 实例。

* **返回值**：`{boolean}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = attach(foo);
const barArray = wrapper.findAll(bar);
expect(barArray.isSanInstance()).toBe(true);
```
