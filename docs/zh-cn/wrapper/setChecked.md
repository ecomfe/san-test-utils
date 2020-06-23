# setChecked
---

设置 `checkbox` 或 `radio` 类 `<input>` 元素的 `checked` 值。

* **参数**：

    - `{Boolean} checked` (默认值：true)

* **示例**：

```js
import {mount} from 'san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
const radioInput = wrapper.find('input[type="radio"]');
radioInput.setChecked();
```
