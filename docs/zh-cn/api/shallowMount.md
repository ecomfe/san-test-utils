# shallowMount()
---

* **参数**：

    - `{Component} component`
    - `{Object} options`
        * `{boolean} attachToDocument`
        * `{Object} slots`
            - `{Array<Component|Object>|Component|string} default`
            - `{Array<Component|Object>|Component|string} named`
        * `{Object|Array<string>} stubs`
        * `{Object} data`
        * `{Object|Component} parentComponent`
        * `{Object} methods`

* **返回值**：`{Wrapper}`

* **选项**：移步 [挂载选项](../mountOptions/index.md)

* **用法**：

和 `mount` 一样，创建一个包含被挂载和渲染的 San 组件的 `Wrapper`，不同的是子组件会被存根。

#### 不使用options选项

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = shallowMount(foo);
        expect(wrapper.contains('div')).toBe(true);
    });
});
```

#### 使用options选项

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = shallowMount(foo, {
            data: {
                color: 'red'
            }
        });
        expect(wrapper.data().color).toBe('red');
    });
});
```

#### 固定在DOM上

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = shallowMount(foo, {
            attachToDocument: true
        });
        expect(wrapper.contains('div')).toBe(true);
    });
});
```

#### 默认插槽和具名插槽

```js
import {shallowMount} from '@baidu/san-test-utils';
import foo from './foo';
import bar from './bar';
import fooBar from './fooBar';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = shallowMount(foo, {
            slots: {
                default: [bar, fooBar],
                fooBar: fooBar, // 将匹配 `<slot name="fooBar" />`。
                foo: '<div />'
            }
        });
        expect(wrapper.contains('div')).toBe(true);
    });
});
```
