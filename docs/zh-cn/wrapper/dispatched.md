# dispatched
---

返回一个包含由 `Wrapper` vm 触发的自定义消息的对象。

* **返回值**：`{[name: string]: Array<Array<any>>}`

* **示例**：

```js
import {mount} from 'san-test-utils';

const wrapper = mount(component);

wrapper.vm.dispatch('foo');
wrapper.vm.dispatch('foo', 123);

/*
`wrapper.dispatchd() 返回如下对象：
{
  foo: [[], [123]]
}
*/

// 断言事件已经被触发
expect(wrapper.dispatchd().foo).toBeTruthy();

// 断言事件的数量
expect(wrapper.dispatchd().foo.length).toBe(2);

// 断言事件的有效数据
expect(wrapper.dispatchd().foo[1]).toEqual([123]);
```

你也可以把上面的代码写成这样：

```js
// 断言事件已经被触发
expect(wrapper.dispatchd('foo')).toBeTruthy();

// 断言事件的数量
expect(wrapper.dispatchd('foo').length).toBe(2);

// 断言事件的有效数据
expect(wrapper.dispatchd('foo')[1]).toEqual([123]);
```

该 `.dispatchd()` 方法每次被调用时都返回相同的对象，而不是返回一个新的，所以当新事件被触发时该对象会被更新：

```js
const dispatchd = wrapper.dispatchd();

expect(dispatchd.foo.length).toBe(1);

// 想办法让 `wrapper` 触发 "foo" 事件

expect(dispatchd.foo.length).toBe(2);
```
