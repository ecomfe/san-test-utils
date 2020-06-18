# text
---

返回 `Wrapper` 的文本内容。

* **返回值**：

    - `{string}`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
expect(wrapper.text()).toBe('bar');
```
