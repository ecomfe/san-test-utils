# at
---

返回第 `index` 个传入的 `Wrapper` 。数字从 0 开始计数 (比如第一个项目的索引值是 0)。

* **参数**：

    - `{number} index`

* **返回值**：`{Wrapper}`

* **示例**：

```js
import {shallowAttach} from 'san-test-utils';
import foo from './foo';

const wrapper = shallowAttach(foo);
const divArray = wrapper.findAll('div');
const secondDiv = divArray.at(1);
expect(secondDiv.is('p')).toBe(true);
```
