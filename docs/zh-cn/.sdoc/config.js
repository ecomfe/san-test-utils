module.exports = {
    title: 'san-test-utils',
    base: '/san-test-utils/',
    head: [
        ['link', {rel: 'icon', href: 'https://baidu.github.io/san/img/favicon.ico'}]
    ],
    meta: {
        description: '单元测试实用工具库'
    },
    theme: '@sdoc/theme-default',
    themeConfig: {
        sidebar: {
            '/': [
                {
                    title: '介绍',
                    children: [
                        {
                            path: '/',
                            title: '介绍',
                            filename: 'index.md'
                        },
                    ]
                },
                {
                    title: '教程',
                    children: [{
                        path: '/guides/start/',
                        title: '起步',
                        filename: 'guides/start.md'
                    }, {
                        path: '/guides/common-tips/',
                        title: '常用技巧',
                        filename: 'guides/common-tips.md'
                    },  {
                        path: '/guides/event/',
                        title: '测试键盘、鼠标等其它 DOM 事件',
                        filename: 'guides/event.md'
                    },  {
                        path: '/guides/test-runner/',
                        title: '选择一个测试运行器',
                        filename: 'guides/test-runner.md'
                    }, {
                        path: '/guides/jest-demo/',
                        title: '用 Jest 测试组件',
                        filename: 'guides/jest-demo.md'
                    }, {
                        path: '/guides/mocha-demo/',
                        title: '用 Mocha 和 webpack 测试组件',
                        filename: 'guides/mocha-demo.md'
                    }, {
                        path: '/guides/karma-demo/',
                        title: '用 Karma 测试组件',
                        filename: 'guides/karma-demo.md'
                    }, {
                        path: '/guides/async/',
                        title: '测试异步行为',
                        filename: 'guides/async.md'
                    }]
                },
                {
                    title: 'API',
                    children: [
                        {
                            path: '/api/attach/',
                            title: 'attach',
                            filename: 'api/attach.md'
                        },
                        {
                            path: '/api/shallowAttach/',
                            title: 'shallowAttach',
                            filename: 'api/shallowAttach.md'
                        },
                        {
                            path: '/api/render/',
                            title: 'render',
                            filename: 'api/render.md'
                        },
                        {
                            path: '/api/renderToString/',
                            title: 'renderToString',
                            filename: 'api/renderToString.md'
                        },
                        {
                            path: '/api/selector/',
                            title: '选择器',
                            filename: 'api/selector.md'
                        },
                        {
                            path: '/api/createWrapper/',
                            title: 'createWrapper',
                            filename: 'api/createWrapper.md'
                        },
                        {
                            path: '/api/config/',
                            title: '配置',
                            filename: 'api/config.md'
                        }
                    ]
                },
                {
                    title: 'Wrapper',
                    children: [
                        {
                            path: '/wrapper/index/',
                            title: '属性',
                            filename: 'wrapper/index.md'
                        },
                        '/wrapper/attributes/',
                        '/wrapper/classes/',
                        '/wrapper/contains/',
                        '/wrapper/fired/',
                        '/wrapper/firedByOrder/',
                        '/wrapper/data/',
                        '/wrapper/detach/',
                        '/wrapper/dispatched/',
                        '/wrapper/dispatchedByOrder/',
                        '/wrapper/exists/',
                        '/wrapper/find/',
                        '/wrapper/findAll/',
                        '/wrapper/html/',
                        '/wrapper/is/',
                        '/wrapper/isEmpty/',
                        '/wrapper/isVisible/',
                        '/wrapper/isSanInstance/',
                        '/wrapper/setChecked/',
                        '/wrapper/setData/',
                        '/wrapper/setMethods/',
                        '/wrapper/setSelected/',
                        '/wrapper/setValue/',
                        '/wrapper/text/',
                        '/wrapper/trigger/'
                    ]
                },
                {
                    title: 'WrapperArray',
                    children: [
                        {
                            path: '/wrapperArray/index/',
                            title: '属性',
                            filename: 'wrapperArray/index.md'
                        },
                        '/wrapperArray/at/',
                        '/wrapperArray/detach/',
                        '/wrapperArray/filter/',
                        '/wrapperArray/is/',
                        '/wrapperArray/isEmpty/',
                        '/wrapperArray/isSanInstance/',
                        '/wrapperArray/setChecked/',
                        '/wrapperArray/setData/',
                        '/wrapperArray/setMethods/',
                        '/wrapperArray/setValue/',
                        '/wrapperArray/trigger/',
                    ]
                },
                {
                    title: '挂载选项',
                    children: [
                        '/attachOptions/slots/',
                        '/attachOptions/stubs/',
                        '/attachOptions/data/',
                        '/attachOptions/attachToDocument/',
                        '/attachOptions/parentComponent/',
                        '/attachOptions/methods/',
                    ]
                }
            ]
        }
    }
}
