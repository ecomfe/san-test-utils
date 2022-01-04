# setSelected
---

选择一个 option 元素。

* **示例**：

```js
import {attach} from 'san-test-utils';
import foo from './foo';

const wrapper = attach(foo);
const options = wrapper.find('select').findAll('option');

options.at(1).setSelected();
```
