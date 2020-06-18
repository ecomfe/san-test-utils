# slots
---

* **类型**：`{[name: string]: Array<Component>|Component|string}`

为组件提供一个 slot 内容的对象。该对象中的键名就是相应的 slot 名，键值可以是一个组件、一个组件数组、一个字符串模板或文本。

* **示例**：

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

const bazComponent = {
    name: 'baz-component',
    template: '<p>baz</p>'
};

const wrapper = shallowMount(component, {
    slots: {
        default: [foo, '<my-component />', 'text'],
        fooBar: foo, // 将会匹配 `<slot name="fooBar" />`.
        foo: '<div />',
        bar: 'bar',
        baz: bazComponent,
        qux: '<my-component />'
    }
});

expect(wrapper.find('div')).toBe(true);
```
