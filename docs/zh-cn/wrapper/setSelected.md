# setSelected
---

选择一个 option 元素。

* **示例**：

```js
import {mount} from '@baidu/san-test-utils';
import foo from './foo';

const wrapper = mount(foo);
const options = wrapper.find('select').findAll('option');

options.at(1).setSelected();
```
