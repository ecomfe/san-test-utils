# find
---

返回匹配选择器的第一个 DOM 节点或 San 组件的 `Wrapper`。

可以使用任何有效的[选择器](../api/selector.md)。

* **参数**：

    - `{string|Component} selector`

* **返回值**：`{Wrapper}`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';
import bar from './bar';

const wrapper = mount(foo);

const div = wrapper.find('div');
expect(div.is('div')).toBe(true);

const bar = wrapper.find(bar);
expect(bar.is(bar)).toBe(true);

const fooRef = wrapper.find({ref: 'foo'});
expect(fooRef.is(foo)).toBe(true);
```
