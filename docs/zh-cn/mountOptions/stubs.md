# stubs
---

* **类型**：`{[name: string]: Component | boolean} | Array<string>`

将子组件存根。可以是一个要存根的组件名的数组或对象。如果 stubs 是一个数组，则每个存根都是一个 `<${component name}-stub>`。

* **示例**：

```js
import {mount, shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

mount(component, {
    stubs: ['registered-component']
});

shallowMount(component, {
    stubs: {
        // 使用一个特定的实现作为存根
        'registered-component': foo,
        // 使用创建默认的实现作为存根。
        // 这里默认存根的组件名是 `another-component`。
        // 默认存根是 `<${the component name of default stub}-stub>`。
        'another-component': true
    }
});
```
