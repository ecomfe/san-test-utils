# 常用技巧

### 明白要测试的是什么

对于 UI 组件来说，我们不推荐一味追求行级覆盖率，因为它会导致我们过分关注组件的内部实现细节，从而导致琐碎的测试。

取而代之的是，我们推荐把测试撰写为断言你的组件的公共接口，并在一个黑盒内部处理它。一个简单的测试用例将会断言一些输入 (用户的交互或 data 的改变) 提供给某组件之后是否导致预期结果 (渲染结果或触发自定义事件)。

比如，对于每次点击按钮都会将计数加一的 `Counter` 组件来说，其测试用例将会模拟点击并断言渲染结果会加 1。该测试并没有关注 `Counter` 如何递增数值，而只关注其输入和输出。

该提议的好处在于，即便该组件的内部实现已经随时间发生了改变，只要你的组件的公共接口始终保持一致，测试就可以通过。

这个话题的细节在 [Matt O'Connell 一份非常棒的演讲](https://www.youtube.com/watch?v=OIpfWTThrK8) 中有更多的讨论。

### 浅渲染

在测试用例中，我们通常希望专注在一个孤立的单元中测试组件，避免对其子组件的行为进行间接的断言。

额外的，对于包含许多子组件的组件来说，整个渲染树可能会非常大。重复渲染所有的子组件可能会让我们的测试变慢。

San Test Utils 允许你通过 shallowAttach 方法只挂载一个组件而不渲染其子组件 (即保留它们的存根)：

```js
import {shallowAttach} from 'san-test-utils';

const wrapper = shallowAttach(component);
wrapper.vm; // 挂载的 San 实例
```

### 断言触发的事件

每个挂载的包裹器都会通过其背后的 San 实例自动记录所有被触发的事件。你可以用 `wrapper.fired()` 方法取回这些事件记录。

```js
wrapper.vm.fire('foo');
wrapper.vm.fire('foo', 123);

/*
`wrapper.fired()` 返回以下对象：
{
    foo: [[], [123]]
}
*/
```

同样的，也可以通过 `wrapper.dispatch()` 方法来触发消息的发送。

```js
wrapper.vm.dispatch('foo');
wrapper.vm.dispatch('foo', 123);

/*
`wrapper.dispatched()` 返回以下对象：
{
    foo: [[], [123]]
}
*/
```

然后你可以基于这些数据来设置断言：

```js
// 断言事件已经被触发
expect(wrapper.fired().foo).toBeTruthy()

// 断言事件的数量
expect(wrapper.fired().foo.length).toBe(2)

// 断言事件的有效数据
expect(wrapper.fired().foo[1]).toEqual([123]);
你也可以调用 wrapper.firedByOrder() 获取一个按触发先后排序的事件数组。
```

### 从子组件触发事件

你可以通过访问子组件实例来触发一个自定义事件

待测试的组件

```js
const childComponent = san.defineComponent({
    name: 'childComponent',
    template: `<div />`
});

const parentComponent = san.defineComponent({
    name: 'parentComponent',
    components: {
        child-component: childComponent
    },
    initData() {
        return {
            emitted: false
        }
    },
    handleCustom() {
        this.data.set('emitted', true);
    },
    template: `<div>
        <child-component on-custom="handleCustom" />
        <p s-if="emitted"><div class="emitted" /></p>
    </div>`
});
```

测试代码

```js
import {shallowAttach} from 'san-test-utils';
import parentComponent from './parentComponent';
import childComponent from './childComponent';

describe('parentComponent', () => {
    it("contains class 'emitted!' when custom event is emitted", done => {
        const wrapper = attach(parentComponent);
        wrapper.find(childComponent).vm.fire('custom');
        san.nextTick(() => {
            expect(wrapper.html()).toContain('<div class="emitted"></div>');
            done();
        });
    });
})
```

### 操作组件数据

你可以在包裹器上用 `setData` 方法直接操作组件状态：

```js
wrapper.setData({count: 10});
```

### 数据注入

```js
import {attach} from 'san-test-utils';

const data = {
    foo: 'bar',
    bar: 123
};

attach(component, {
    data
});
```

### 存根组件

你可以使用 `stubs` 选项覆写已经注册的组件：

```js
import {attach} from 'san-test-utils';

attach(component, {
  // 将会把 globally-registered-component 解析为空的存根
  stubs: ['globally-registered-component']
});
```
