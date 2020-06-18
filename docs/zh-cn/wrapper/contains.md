# contains
---

判断 `Wrapper` 是否包含了一个匹配[选择器](../api/selector.md)的元素或组件。


* **参数**：

    - `{string|Component} selector`

* **返回值**：`boolean`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = mount(Foo);
expect(wrapper.contains('p')).toBe(true);
expect(wrapper.contains(bar)).toBe(true);
```
