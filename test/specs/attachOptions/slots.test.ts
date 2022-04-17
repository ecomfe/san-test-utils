/**
 * @file san test utils attach options test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithSlots from '../../resources/component-with-slots';
import componentAsAClass from '../../resources/component-as-a-class';
import component from '../../resources/component';

/* global test jest */
describeWithShallowAndAttach('options.slots', (attach, methodName) => {
    test('attachs component with default slot if passed component in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: component
            }
        });
        expect(wrapper.contains(component)).toEqual(true);
    });

    if (methodName !== 'shallowAttach') {
        test('attachs component with default slot if passed component as string in slot object', () => {
            const customComponent = san.defineComponent({
                template: '<time />'
            });
            const testComponent = san.defineComponent({
                components: {
                    'custom-component': customComponent
                },
                template: '<div><slot /></div>'
            });

            const wrapper = attach(testComponent, {
                slots: {
                    default: '<custom-component />'
                }
            });

            expect(wrapper.contains('time')).toEqual(true);
        });
    }

    test('attachs component with default slot if passed component in array in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: [component]
            }
        });
        expect(wrapper.contains(component)).toEqual(true);
    });

    test('attachs component with default slot if passed plain object in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: [{template: '<div id="div" />'}]
            }
        });
        expect(wrapper.contains('#div')).toEqual(true);
    });

    test('attachs component with default slot if passed string in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: '<span />'
            }
        });
        expect(wrapper.contains('span')).toEqual(true);
    });


    test('works correctly with class component', () => {
        const wrapper = attach(componentAsAClass, {
            slots: {
                default: '<span />'
            }
        });
        expect(wrapper.contains('span')).toEqual(true);
    });


    test('attachs component with default slot if passed string in slot array object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: ['<span />']
            }
        });
        expect(wrapper.contains('span')).toEqual(true);
    });

    test('attachs component with named slot if passed component in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                header: [component],
                footer: [component]
            }
        });
        expect(wrapper.findAll(component).length).toEqual(2);
    });

    test('attachs component with default and named slots', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: '<span>hello</span>',
                footer: '<p>world</p>'
            }
        });
        const HTML = wrapper.html();
        expect(HTML).toContain('<span>hello</span>');
        expect(HTML).toContain('<p>world</p>');
    });

    test('attachs component with default and named text slot', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                footer: 'world',
                default: 'hello,'
            }
        });
        const text = wrapper.text();
        expect(text.replace(/(\r\n)|(\s)*/g, '')).toContain('hello,world');
    });

    test('attachs component with named slot if passed component in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                header: component
            }
        });
        expect(wrapper.findAll(component).length).toEqual(1);
        expect(Array.isArray(wrapper.vm.sourceSlots.named.header)).toEqual(true);
    });

    test('supports multiple root nodes in default slot option', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: ['<time /><time />']
            }
        });
        expect(wrapper.findAll('time').length).toEqual(2);
    });

    test('throws error if passed false for slots', () => {
        const fn = () => attach(componentWithSlots, {
            slots: {
                default: [false]
            }
        });
        const message = '[san-test-utils]: slots[key] must be a Component, string or an array of Components';
        expect(fn).toThrow(new Error(message));
    });

    test('throws error if passed a number for slots', () => {
        const fn = () => attach(componentWithSlots, {
            slots: {
                default: [1]
            }
        });
        const message = '[san-test-utils]: slots[key] must be a Component, string or an array of Components';
        expect(fn).toThrow(new Error(message));
    });

    test('throws error if passed false for slots', () => {
        const fn = () => attach(componentWithSlots, {
            slots: {
                default: false
            }
        });
        const message = '[san-test-utils]: slots[key] must be a Component, string or an array of Components';
        expect(fn).toThrow(new Error(message));
    });

    test('throws error if passed a number for slots', () => {
        const fn = () => attach(componentWithSlots, {
            slots: {
                default: 1
            }
        });
        const message = '[san-test-utils]: slots[key] must be a Component, string or an array of Components';
        expect(fn).toThrow(new Error(message));
    });

    test('does not error when triggering a click in a slot', () => {
        const child = san.defineComponent({
            template: `<div>
                <slot />
            </div>`
        });
        const parent = san.defineComponent({
            template: `<div>
                <child>
                    <slot name="content"></slot>
                </child>
            </div>`
        });


        const wrapper = attach(parent, {
            slots: {
                content: '*parent content!*'
            },
            stubs: {
                child
            }
        });
        wrapper.find('div').trigger('click');
    });

    test('attachs component with default slot if passed class component in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: componentAsAClass
            }
        });
        expect(wrapper.contains(componentAsAClass)).toEqual(true);
    });

    test('attachs component with default slot if passed class component in array in slot object', () => {
        const wrapper = attach(componentWithSlots, {
            slots: {
                default: [componentAsAClass]
            }
        });
        expect(wrapper.contains(componentAsAClass)).toEqual(true);
    });

    test('sets a component which can access the parent component and the child component', () => {
        const childComponentName = 'component-with-parent-name';
        const componentWithParentName = san.defineComponent({
            name: childComponentName,
            initData() {
                return {
                    bar: 'bar'
                };
            },
            attached() {
                this.parentComponent.childComponentName = this.name;
            },
            template: `<div>
                <span baz="qux">{{bar}}</span>
            </div>`
        });
        let parentComponent = attach({
            name: 'parentComponent',
            template: '<div><slot /></div>',
            initData() {
                return {
                    childComponentName: ''
                };
            }
        }, {
            stubs: {
                'component-with-parent-name': componentWithParentName
            },
            slots: {
                default: [
                    '<component-with-parent-name />',
                    '<component-with-parent-name />'
                ]
            }
        });
        expect(parentComponent.vm.childComponentName).toEqual(childComponentName);
        expect(parentComponent.findAll('span[baz="qux"]').length).toEqual(2);
        const childComponents = parentComponent.findAll(componentWithParentName);
        expect(childComponents.at(0).vm.name).toEqual(childComponentName);
        expect(childComponents.at(1).vm.name).toEqual(childComponentName);

        parentComponent = attach(
            {
                name: 'parentComponent',
                template: '<div><slot /></div>'
            },
            {
                slots: {
                    default: {
                        name: childComponentName,
                        template: '<p>1234</p>',
                        attached() {
                            this.parentComponent.childComponentName = this.name;
                        }
                    }
                }
            }
        );

        expect(parentComponent.vm.childComponentName).toEqual(childComponentName);
        expect(parentComponent.vm.children[0].children.length).toEqual(1);
        expect(parentComponent.vm.children[0].children[0].children[0].name).toEqual(childComponentName);
    });
});
