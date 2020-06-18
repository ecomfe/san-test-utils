# render()
---

* **参数**：

    - `{Component} component`
    - `{Object} options`
        * `{Object|Array<string>} stubs`
        * `{Object} data`

* **返回值**：`{Promise<CheerioWrapper>}`

* **选项**：移步 [挂载选项](../mountOptions/index.md)

* **用法**：

将一个对象渲染成为一个字符串并返回一个 [cheerio 包裹器](https://github.com/cheeriojs/cheerio)。

Cheerio 是一个类似 jQuery 的库，可以在 Node.js 中游览 DOM 对象。它的 API 和 San Test Utils 的 `Wrapper` 类似。

`render` 在底层使用 [`san-ssr`](https://github.com/baidu/san-ssr) 将一个组件渲染为静态的 HTML。

#### 不使用options选项

```js
import {render} from '@baidu/san-test-utils/dist/san-test-utils.ssr';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', async () => {
        const wrapper = await render(foo);
        expect(wrapper.text()).toContain('<div></div>')
    });
});
```

#### 使用options选项

```js
import {render} from '@baidu/san-test-utils/dist/san-test-utils.ssr';
import foo from './foo';

describe('Foo', () => {
    it('renders a div', async () => {
        const wrapper = render(foo, {
            data: {
                color: 'red'
            }
        });
        expect(wrapper.text()).toContain('red');
    });
});
```
