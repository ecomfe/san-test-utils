# methods
---

* **类型**：`Object`

设置组件默认的方法

* **示例**：

```js
import {attach} from 'san-test-utils';

const component = {
    template: '<div>{{foo()}}{{bar()}}{{baz()}}</div>',
    foo() {
        return 'a'
    }
};
const options = {
    methods: {
        bar() {
            return 'B'
        },
        baz() {
            return 'C'
        }
    }
};
const wrapper = attach(component, options);
expect(wrapper.text()).toBe('aBC');
```
