# filter
---

用一个针对 `Wrapper` 的断言函数过滤 `WrapperArray`。

该方法的行为和 `Array.prototype.filter` 相同。

* **参数**：

    - `{function} predicate`

* **返回值**：`{WrapperArray}`

一个新的 `WrapperArray` 实例，该实例包含了经过断言函数处理后返回真值的 `Wrapper` 实例。

* **示例**：

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

const wrapper = shallowMount(foo);
const filteredDivArray = wrapper
  .findAll('div')
  .filter(w => !w.hasClass('filtered'));
```
