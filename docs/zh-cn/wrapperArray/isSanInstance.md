# isSanInstance
---

判断 `WrapperArray` 的每个 `Wrapper` 都是 San 实例。

* **返回值**：`{boolean}`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = mount(foo);
const barArray = wrapper.findAll(bar);
expect(barArray.isSanInstance()).toBe(true);
```
