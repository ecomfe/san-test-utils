# isSanInstance
---

判断 `Wrapper` 是 San 实例。

* **返回值**：`{boolean}`

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
expect(wrapper.isSanInstance()).toBe(true);
```
