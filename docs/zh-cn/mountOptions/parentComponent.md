# parentComponent
---

* **类型**：`Object`

用来作为被挂载组件的父级组件。

* **示例**：

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

const wrapper = shallowMount(component, {
    parentComponent: foo
});
expect(wrapper.vm.parentComponent.name).toBe('foo');
```
