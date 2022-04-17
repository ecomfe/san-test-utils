# detach
---

销毁 `WrapperArray` 中的每个 San Wrapper。

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
const divArray = wrapper.findAll('div');
expect(divArray.contains('p')).toBe(true);
divArray.destroy();
expect(divArray.contains('p')).toBe(false);
```
