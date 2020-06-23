# createWrapper()
---

* **参数**：

    - `{vm|HTMLElement} node`
    - `{Object} options`
        * `{boolean} attachToDocument`

* **返回值**：`{Wrapper}`

* **用法**：

`createWrapper` 为一个被挂载的 San 实例或一个 HTML 元素创建一个 `Wrapper`。

```js
import {createWrapper} from 'san-test-utils';
import Foo from './foo';

const vm = new Foo();
const wrapper = createWrapper(vm);
expect(wrapper.vm.data.get('foo')).toBe(true);
```
