# detach
---

销毁一个 San 组件实例。

* **示例**：

```js
import {attach} from 'san-test-utils';
import sinon from 'sinon';

const spy = sinon.stub();
attach({
    template: '<div />',
    detached() {
        spy()
    }
}).detach();
expect(spy.calledOnce).toBe(true);
```

如果挂载时 `attachToDocument` 被设为 true，则组件的 DOM 元素也将会从文档中被移除。
