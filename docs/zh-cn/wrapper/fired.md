# fired
---

返回一个包含由 `Wrapper` vm 触发的自定义事件的对象。

* **返回值**：`{[name: string]: Array<Array<any>>}`

* **示例**：

```js
import {attach} from 'san-test-utils';

const wrapper = attach(component);

wrapper.vm.fire('foo');
wrapper.vm.fire('foo', 123);

/*
`wrapper.fired() 返回如下对象：
{
  foo: [[], [123]]
}
*/

// 断言事件已经被触发
expect(wrapper.fired().foo).toBeTruthy();

// 断言事件的数量
expect(wrapper.fired().foo.length).toBe(2);

// 断言事件的有效数据
expect(wrapper.fired().foo[1]).toEqual([123]);
```

你也可以把上面的代码写成这样：

```js
// 断言事件已经被触发
expect(wrapper.fired('foo')).toBeTruthy();

// 断言事件的数量
expect(wrapper.fired('foo').length).toBe(2);

// 断言事件的有效数据
expect(wrapper.fired('foo')[1]).toEqual([123]);
```

该 `.fired()` 方法每次被调用时都返回相同的对象，而不是返回一个新的，所以当新事件被触发时该对象会被更新：

```js
const fired = wrapper.fired();

expect(fired.foo.length).toBe(1);

// 想办法让 `wrapper` 触发 "foo" 事件

expect(fired.foo.length).toBe(2);
```
