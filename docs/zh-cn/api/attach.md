# attach()
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

* **选项**：移步 [挂载选项](../attachOptions/index.md)

* **用法**：

创建一个包含被挂载和渲染的 San 组件的 `Wrapper`。

#### 不使用options选项

```js
import {attach} from 'san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = attach(foo);
        expect(wrapper.contains('div')).toBe(true);
    });
});
```

#### 使用options选项

```js
import {attach} from 'san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = attach(foo, {
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
import {attach} from 'san-test-utils';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = attach(foo, {
            attachToDocument: true
        });
        expect(wrapper.contains('div')).toBe(true);
    });
});
```

#### 默认插槽和具名插槽

```js
import {attach} from 'san-test-utils';
import foo from './foo';
import bar from './bar';
import fooBar from './fooBar';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = attach(foo, {
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

#### 将组件存根

```js
import {attach} from 'san-test-utils';
import foo from './foo';
import bar from './bar';
import faz from './faz';

describe('Foo', () => {
    it('renders a div', () => {
        const wrapper = attach(foo, {
            stubs: {
                bar: '<div class="stubbed" />',
                barfoo: true,
                foobar: faz
            }
        });
        expect(wrapper.contains('.stubbed')).toBe(true);
        expect(wrapper.contains(bar)).toBe(true);
    });
});
```

* 延伸阅读：[`Wrapper`](../wrapper/index.md)
