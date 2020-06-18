# 属性
---

San Test Utils 是一个基于包裹器的 API。

一个 `Wrapper` 是一个包括了一个挂载组件，以及可用于该组件测试的方法。

### **`vm`**

`Component`：这是个 San 实例。你可以通过 wrapper.vm 访问一个实例所有的方法和属性。只有 San 组件包裹器或绑定了 San 组件包裹器的 HTMLElement 中才有该属性。

### **`el`**

`HTMLElement`：包裹器的根 DOM 节点

### **`options`**

`options.attachedToDocument<boolean>`：如果组件在渲染之后被添加到了文档上则为真

