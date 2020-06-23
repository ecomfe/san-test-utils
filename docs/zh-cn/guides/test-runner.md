# 选择一个测试运行器

测试运行器 (test runner) 就是运行测试的程序。

主流的 JavaScript 测试运行器有很多，但 San Test Utils 都能够支持。它是与测试运行器无关的。

当然在我们选用测试运行器的时候也需要考虑一些事项：功能集合、性能和对单文件组件预编译的支持等。在仔细比对现有的库之后，我们推荐其中的两个测试运行器：

* [Jest](https://jestjs.io/docs/zh-Hans/getting-started) 是功能最全的测试运行器。它所需的配置是最少的，默认安装了 JSDOM，内置断言且命令行的用户体验非常好。不过你需要一个能够将单文件组件导入到测试中的预处理器。

* [mocha-webpack](https://github.com/zinserjan/mocha-webpack) 是一个 webpack + Mocha 的包裹器，同时包含了更顺畅的接口和侦听模式。

### 浏览器环境
San Test Utils 依赖浏览器环境。技术上讲你可以将其运行在一个真实的浏览器，但是我们并不推荐，因为在不同的平台上都启动真实的浏览器是很复杂的。我们推荐取而代之的是用 [JSDOM](https://github.com/tmpvar/jsdom) 在 Node 虚拟浏览器环境运行测试。

Jest 测试运行器自动设置了 JSDOM。对于其它测试运行器来说，你可以在你的测试入口处使用 [jsdom-global](https://github.com/rstacruz/jsdom-global) 手动设置 JSDOM。

```js
npm install --save-dev jsdom jsdom-global
```

```js
// 在测试的设置 / 入口中
require('jsdom-global')()
```

### 测试单文件组件

San 的单文件组件在它们运行于 Node 或浏览器之前是需要预编译的。我们推荐使用 webpack。

如何设置请移步下面的教程：

* [用 Mocha 和 webpack 测试单文件组件](./mocha-demo.md);

### 相关资料

* [测试运行器性能比拼](https://github.com/eddyerburgh/vue-unit-test-perf-comparison)
* [使用 Jest 的示例工程](https://github.com/ecomfe/san-test-utils/tree/master/docs/demo/jest)
* [使用 Mocha 的示例工程](https://github.com/ecomfe/san-test-utils/tree/master/docs/demo/mocha)
* [使用 Karma 的示例工程](https://github.com/ecomfe/san-test-utils/tree/master/docs/demo/karma)
