# isVisible
---

判断 `Wrapper` 是否可见。

如果有一个祖先元素拥有 `display: none` 或 `visibility: hidden` 样式则返回 false。

* **返回值**： `{boolean}`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils'
import foo from './foo'

const wrapper = mount(foo);
expect(wrapper.isVisible()).toBe(true);
expect(wrapper.find('.is-not-visible').isVisible()).toBe(false);
```
