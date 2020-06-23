# trigger
---

在该 `Wrapper` DOM 节点上触发一个事件。

`trigger` 带有一个可选的 `options` 对象。`options` 对象内的属性会被添加到事件上。

* **参数**：

    - `{string} eventType` 必填
    - `{Object} options` 可选

* **示例**：

```js
import {mount} from 'san-test-utils';
import sinon from 'sinon';
import foo from './foo';

const clickHandler = sinon.stub();
const wrapper = mount(foo, {
    methods: { clickHandler }
});

wrapper.trigger('click');

wrapper.trigger('click', {
    button: 0
});

wrapper.trigger('click', {
    ctrlKey: true
});

expect(clickHandler.called).toBe(true);
```

* 设置事件目标：

在这背后，`trigger` 创建了一个 `Event` 对象并分发到其包裹器的元素上。

我们没有机会编辑 `Event` 对象的 `target` 值，所以你无法在选项对象中设置 `target`。

如果想在 `target` 中添加一个特性，你需要在调用 `trigger` 之前设置包裹器元素的那个值。你可以设置 `el` 属性来完成。

```js
const input = wrapper.find('input');
input.el.value = 100;
input.trigger('click');
```
