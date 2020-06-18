# 起步

> 我们在 [icode](http://icode.baidu.com/repos/baidu/hulk/san-test-utils/tree/master:docs/demo/start) 上放有一个关于起步的示例工程。

# 安装

快速尝鲜 San Test Utils 的办法就是克隆我们的 demo 仓库再加上基本的设置和依赖安装。

```js
$ git clone ssh://mayihui@icode.baidu.com:8235/baidu/hulk/san-test-utils
$ cd docs/demo/start
$ npm install
```

你会发现该工程包含了一个简单的组件 `counter.js`：

```js
// counter.js

import san from 'san';

export default san.defineComponent({
    template: `<div>
        <span class="count">{{count}}</span>
        <button on-click="increment">Increment</button>
    </div>`,

    initData() {
        return {
            count: 0
        }
    },

    increment() {
        let count = this.data.get('count');
        this.data.set('count', ++count);
    }
})
```

### 挂载组件

San Test Utils 通过将它们隔离挂载，然后模拟必要的输入 (data、用户事件) 和对输出 (渲染结果、触发的自定义事件) 的断言来测试 San 组件。

被挂载的组件会返回到一个 [包裹器](../wrapper/index.md) 内，而包裹器会暴露很多封装、遍历和查询其内部的 San 组件实例的便捷的方法。

你可以通过 `mount` 方法来创建包裹器。让我们创建一个名叫 `test.js` 的文件：

```js
// test.js

// 从测试实用工具集中导入 `mount()` 方法
// 同时导入你要测试的组件
import {mount} from '@baidu/san-test-utils';
import counter from './counter';

// 现在挂载组件，你便得到了这个包裹器
const wrapper = mount(Counter);

// 你可以通过 `wrapper.vm` 访问实际的 San 实例
const vm = wrapper.vm;

// 我们对 San Test Utils 的探索也由此开始
console.log(wrapper);
```

### 测试组件渲染出来的 HTML

现在我们已经有了这个包裹器，我们能做的第一件事就是确认该组件渲染出来的 HTML 符合预期。

```js
import {mount} from '@baidu/san-test-utils';
import counter from './counter';

describe('Counter', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = mount(counter);

    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<span class="count">0</span>');
    });

    // 也便于检查已存在的元素
    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });
});
```

现在运行 `npm test` 进行测试。你应该看得到测试通过。

### 模拟用户交互

当用户点击按钮的时候，我们的计数器应该递增。为了模拟这一行为，我们首先需要通过 `wrapper.find()` 定位该按钮，此方法返回一个该按钮元素的包裹器。然后我们能够通过对该按钮包裹器调用 `.trigger()` 来模拟点击。

```js
it('button click should increment the count', () => {
    expect(wrapper.vm.data.get('count')).toBe(0);
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.data.get('count')).toBe(1);
});
```

### 关于异步

San 会异步的将未生效的 DOM 更新批量应用，以避免因数据反复突变而导致的无谓的重渲染。这也是为什么在实践过程中我们经常在触发状态改变后用 San.nextTick 来等待 San 把实际的 DOM 更新做完的原因。

在上面的例子中，当按钮被点击时，count会被同步+1，但对应的 DOM 实际并没有更新，如果想测试对应 DOM 是否正常渲染，可以使用如下写法：

```js
it('button click should increment the count', done => {
    expect(wrapper.vm.data.get('count')).toBe(0);
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.data.get('count')).toBe(1);
    san.nextTick(() => {
        expect(wrapper.html()).toContain('<span class="count">1</span>');
        done();
    });
});
```

### 下一步是什么

* [选择一个测试运行器](./test-runner.md) 以把 San Test Utils 集成到你的工程里。
* 移步 [撰写测试的常见技巧](./common-tips.md) 以学习更多。
