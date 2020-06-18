# renderToString()
---

* **参数**：

    - `{Component} component`
    - `{Object} options`
        * `{Object|Array<string>} stubs`
        * `{Object} data`

* **返回值**：`{string}`

* **选项**：移步 [挂载选项](../mountOptions/index.md)

* **用法**：

将一个组件渲染为 HTML。

`renderToString` 在底层使用 [`san-ssr`](https://github.com/baidu/san-ssr) 将一个组件渲染为静态的 HTML。

#### 不使用options选项

```js
import {renderToString} from '@baidu/san-test-utils/dist/san-test-utils.ssr';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const html = renderToString(foo);
        expect(html).toContain('<div></div>')
    });
});
```

#### 使用options选项

```js
import {renderToString} from '@baidu/san-test-utils/dist/san-test-utils.ssr';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', () => {
        const html = renderToString(foo, {
            data: {
                color: 'red'
            }
        });
        expect(html).toContain('red');
    });
});
```
