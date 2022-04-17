# setValue
---

该方法是接下来这段代码的别名：

```js
wrapperArray.wrappers.forEach(wrapper => wrapper.setValue(value));
```

* **参数**：

    - `{any} value`

* **示例**：

```js
import {attach} from 'san-test-utils';

const wrapper = attach({
    initData() {
        return {
            t1: '',
            t2: ''
        };
    },
    template: `<div>
        <input type="text" name="t1" class="foo" value="{=t1=}" />
        <input type="text" name="t2" class="foo" value="{=t2=}" />
    </div>`
});

const wrapperArray = wrapper.findAll('.foo');
expect(wrapper.vm.data.get('t1')).toEqual('');
expect(wrapper.vm.data.get('t2')).toEqual('');
wrapperArray.setValue('foo');
expect(wrapper.vm.data.get('t1')).toEqual('foo');
expect(wrapper.vm.data.get('t2')).toEqual('foo');
```
