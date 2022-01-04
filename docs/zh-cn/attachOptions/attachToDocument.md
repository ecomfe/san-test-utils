# attachToDocument
---

* **类型**：`boolean`

* **默认值**：`false`

当设为 true 时，组件在渲染时将会挂载到 DOM 上。

如果添加到了 DOM 上，你应该在测试的最后调用 `wrapper.detach()` 将元素从文档中移除并销毁组件实例。
