# setValue
---

设置一个文本控件或 `select` 元素的值。

* **参数**：

    - `{String} value`

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';

const wrapper = mount(foo);

const textInput = wrapper.find('input[type="text"]');
textInput.setValue('some value');

const select = wrapper.find('select');
select.setValue('option value');
```
