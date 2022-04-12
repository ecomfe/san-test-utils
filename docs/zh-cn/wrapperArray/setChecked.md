# setChecked
---

该方法是接下来这段代码的别名：

```js
wrapperArray.wrappers.forEach(wrapper => wrapper.setChecked(checked))
```

* **参数**：

    - `{Boolean} checked (default: true)`

* **示例**：

```js
import {attach} from 'san-test-utils';

const wrapper = attach({
  initData() {
        return {
            t1: [],
            t2: ''
        }
  },
  template: `
    <div>
        <input type="checkbox" name="t1" class="foo" checked="{=t1=}" />
        <input type="radio" name="t2" class="foo" value="foo" checked="{=t2=}"/>
        <input type="radio" name="t2" class="bar" value="bar" checked="{=t2=}"/>
    </div>`
});

expect(wrapper.vm.data.get('t1')).toEqual([]);
expect(wrapper.vm.data.get('t2')).toEqual('');
wrapperArray.setChecked();
san.nextTick(() => {
    expect(wrapper.vm.data.get('t1')).toEqual(['t1']);
    expect(wrapper.vm.data.get('t2')).toEqual('foo');
    expect(wrapperArray.at(0).el.checked).toEqual(true);
    expect(wrapperArray.at(1).el.checked).toEqual(true);
    done();
});
```
