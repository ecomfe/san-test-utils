# html
---

返回 `Wrapper DOM` 节点的 HTML 字符串。

* **返回值**：`{string}`

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
expect(wrapper.html()).toBe('<div><p>Foo</p></div>');
```
