# setMethods
---

为 `WrapperArray` 的每个 `Wrapper` `vm` 都设置方法并强行更新。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{Object} methods`

* **示例**：

```js
import {attach} from 'san-test-utils';
import sinon from 'sinon';
import foo from './foo';
import bar from './bar';

const wrapper = attach(foo);
const barArray = wrapper.findAll(bar);
const clickMethodStub = sinon.stub();

barArray.setMethods({clickMethod: clickMethodStub});
barArray.at(0).trigger('click');
expect(clickMethodStub.called).toBe(true);
```
