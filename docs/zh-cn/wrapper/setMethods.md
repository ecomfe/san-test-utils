# setMethods
---

设置 `Wrapper` `vm` 的方法并强制更新。

注意：该包裹器必须包含一个 San 实例。

* **参数**：

    - `{Object} methods`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import sinon from 'sinon';
import foo from './foo';

const wrapper = mount(foo);
const clickMethodStub = sinon.stub();

wrapper.setMethods({clickMethod: clickMethodStub});
wrapper.find('button').trigger('click');
expect(clickMethodStub.called).toBe(true);
```
