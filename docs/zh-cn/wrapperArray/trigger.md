# trigger
---

为 `WrapperArray` 的每个 `Wrapper` DOM 节点都触发一个事件。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{string} eventType` 必填
    - `{Object} options` 可选

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import sinon from 'sinon';
import foo from './foo';

const clickHandler = sinon.stub();
const wrapper = mount(foo, {
    methods: {clickHandler}
});

const divArray = wrapper.findAll('div');
divArray.trigger('click');
expect(clickHandler.called).toBe(true);
```
