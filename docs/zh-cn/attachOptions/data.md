# data
---

* **类型**：`Object`

在组件被挂载时设置组件实例的 data。

* **示例**：

```js
const component = {
    template: '<div>{{msg}}</div>',
};
const wrapper = attach(component, {
    data: {
        msg: 'aBC'
    }
});
expect(wrapper.text()).toBe('aBC');
```
