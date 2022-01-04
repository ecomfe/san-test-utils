# 选择器
---

很多方法的**参数**中都包含选择器。一个选择器可以是一个 CSS 选择器、一个 San 组件或是一个查找选项对象。

### CSS 选择器
挂载处理任何有效的 CSS 选择器：

* 标签选择器 (`div`、`foo`、`bar`)
* 类选择器 (`.foo`、`.bar`)
* 特性选择器 (`[foo]`、`[foo="bar"]`)
* id 选择器 (`#foo`、`#bar`)
* 伪选择器 (`div:first-of-type`)

你也可以结合使用：

* 直接从属结合 (`div > #bar > .foo`)
* 一般从属结合 (`div #bar .foo`)
* 近邻兄弟选择器 (`div + .foo`)
* 一般兄弟选择器 (`div ~ .foo`)

### San 组件
San 组件也是有效的选择器。

```js
// Foo

export default san.defineComponent({
    name: 'fooComponent',
    template: '<div />'
});
```

```js
import {shallowAttach} from 'san-test-utils';
import foo from './foo';

const wrapper = shallowAttach(foo);
expect(wrapper.is(foo)).toBe(true);
```

> 注意：使用组件作为选择器**参数**时该组件必须有且唯一的name值。

### 查找选项对象

#### Ref

San Test Utils 允许通过一个查找选项对象在组件包裹器上根据 s-ref 选择元素。

```js
const buttonWrapper = wrapper.find({ref: 'myButton'});
buttonWrapper.trigger('click');
```
