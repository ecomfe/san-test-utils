# isSanInstance
---

判断 `Wrapper` 是 San 实例。

* **返回值**：`{boolean}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
expect(wrapper.isSanInstance()).toBe(true);
```
