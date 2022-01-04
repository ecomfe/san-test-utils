# parentComponent
---

* **类型**：`Object`

用来作为被挂载组件的父级组件。

* **示例**：

```js
import {shallowAttach} from 'san-test-utils';
import foo from './foo';

const wrapper = shallowAttach(component, {
    parentComponent: foo
});
expect(wrapper.vm.parentComponent.name).toBe('foo');
```
