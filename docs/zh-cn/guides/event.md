# 测试键盘、鼠标等其它 DOM 事件

### 触发事件

`Wrapper` 封装了一个 `trigger` 方法。它可以用来触发 DOM 事件。

```js
const wrapper = mount(myButton);

wrapper.trigger('click');
```

你应该注意到了，`find` 方法也会返回一个 `Wrapper`。假设 `myComponent` 包含一个按钮，下面的代码会点击这个按钮。

```js
const wrapper = mount(myComponent);

wrapper.find('button').trigger('click');
```

### 选项

其 `trigger` 方法接受一个可选的 `options` 对象。这个 `options` 对象里的属性会被添加到事件中。

注意 `target` 对象不能被添加到 `options` 对象中。

```js
const wrapper = mount(myButton);

wrapper.trigger('click', {button: 0});
```

### 鼠标点击示例

待测试的组件

```js
import san from 'san';

export default san.defineComponent({
    name: 'YesNoComponent',
    callYes() {
        this.callMe('yes');
    },
    callNo() {
        this.callMe('no');
    },
    template: `<div>
        <button class="yes" on-click="callYes">Yes</button>
        <button class="no" on-click="callNo">No</button>
    </div>`
})
```

测试

```js
import yesNoComponent from './yesNoComponent';
import {mount} from '@baidu/san-test-utils';
import sinon from 'sinon';

describe('Click event', () => {
    it('Click on yes button calls our method with argument "yes"', () => {
        const spy = sinon.spy()
        const wrapper = mount(yesNoComponent, {
            methods: {
                callMe: spy
            }
        });
        wrapper.find('button.yes').trigger('click');

        spy.should.have.been.calledWith('yes');
    });
});
```

### 键盘示例

待测试的组件

这个组件允许使用不同的按键将数量递增/递减。

```js
import san from 'san';

const KEY_DOWN = 40;
const KEY_UP = 38;
const ESCAPE = 27;

export default san.defineComponent({
    initData() {
        return {
            quantity: 0
        };
    },
    inited() {
        this.watch('quantity', val => {
            this.fire('input', val);
        });
    },
    increment() {
        let quantity = this.data.get('quantity');
        this.data.set('quantity', ++quantity);
    },
    decrement() {
        let quantity = this.data.get('quantity');
        this.data.set('quantity', --quantity);
    },
    clear() {
        this.data.set('quantity', 0);
    },
    onKeydown(e) {
        if (e.keyCode === ESCAPE) {
            this.clear();
        }
        if (e.keyCode === KEY_DOWN) {
            this.decrement();
        }
        if (e.keyCode === KEY_UP) {
            this.increment();
        }
        if (e.key === 'a') {
            this.data.set('quantity', 13);
        }
    },
    template: '<input type="text" on-keydown="onKeydown" value="{=quantity=}" />'
});
```

测试用例

```js
import quantityComponent from './quantityComponent';
import {mount} from '@baidu/san-test-utils';

describe('Key event tests', () => {
    it('Quantity is zero by default', () => {
        const wrapper = mount(quantity);
        expect(wrapper.vm.data.get('quantity')).toBe(0);
    });

    it('Up arrow key increments quantity by 1', () => {
        const wrapper = mount(quantity);
        wrapper.trigger('keydown-up');
        expect(wrapper.vm.data.get('quantity')).toBe(1);
    });

    it('Down arrow key decrements quantity by 1', () => {
        const wrapper = mount(quantity);
        wrapper.vm.data.set('quantity', 5);
        wrapper.trigger('keydown-down');
        expect(wrapper.vm.data.get('quantity')).toBe(4);
    });

    it('Escape sets quantity to 0', () => {
        const wrapper = mount(quantity);
        wrapper.vm.data.set('quantity', 5);
        wrapper.trigger('keydown-esc');
        expect(wrapper.vm.data.get('quantity')).toBe(0);
    });

    it('Magic character "a" sets quantity to 13', () => {
        const wrapper = mount(quantity);
        wrapper.trigger('keydown', {
            key: 'a'
        });
        expect(wrapper.vm.data.get('quantity')).toBe(13);
    });
})
```

按键名 keydown-up 会被翻译成一个 keyCode。我们目前支持的按键名有：

|key name|key code|
|---|---|
|enter|13|
|esc|27|
|tab|9|
|space|32|
|delete|46|
|backspace|8|
|insert|45|
|up|38|
|down|40|
|left|37|
|right|39|
|end|35|
|home|36|
|pageup|33|
|pagedown|34|
