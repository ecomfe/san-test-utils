# exists
---

判断 `Wrapper` 或 `WrapperArray` 是否存在。

如果被一个空 `Wrapper` 或 `WrapperArray` 调用则返回 false。

* **返回值**：`{boolean}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
expect(wrapper.exists()).toBe(true);
expect(wrapper.find('does-not-exist').exists()).toBe(false);
expect(wrapper.findAll('div').exists()).toBe(true);
expect(wrapper.findAll('does-not-exist').exists()).toBe(false);
```
