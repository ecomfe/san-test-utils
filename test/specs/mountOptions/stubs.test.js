/**
 * @file san test utils mount options test file
 **/

import san from 'san';
import {describeWithMountingMethods} from '../../utils';
import componentWithChild from '../../resources/component-with-child';
import component from '../../resources/component';
import componentAsAClass from '../../resources/component-as-a-class';
import componentWithNestedChildren from '../../resources/component-with-nested-children';
import config from '../../../src/config';

/* global test jest */
describeWithMountingMethods('options.stub', (mount, methodName) => {
    test('accepts valid component stubs', () => {
        mount(componentWithChild, {
            stubs: {
                'child-component': component,
                'child-component1': componentAsAClass
            }
        });
    });

    if (methodName !== 'renderToString') {
        test('replaces component with template string ', () => {
            const wrapper = mount(componentWithChild, {
                stubs: {
                    'child-component': '<div class="stub"></div>'
                }
            });
            expect(wrapper.findAll('.stub').length).toEqual(1);
            expect(wrapper.findAll(component).length).toEqual(1);
            expect(wrapper.findAll(component).at(0).html()).toEqual('<div class="stub"></div>');
        });

        test('replaces component with a component', () => {
            const attached = jest.fn();
            const stub = san.defineComponent({
                template: '<div />',
                attached
            });
            const wrapper = mount(componentWithChild, {
                stubs: {
                    'child-component': stub
                }
            });

            expect(wrapper.findAll(stub).length).toEqual(1);
            expect(attached).toBeCalled();
        });
    }

    test('does not error if component to stub contains no components', () => {
        mount(component, {
            stubs: {
                doesnotexist: component
            }
        });
    });

    if (methodName !== 'shallowMount' && methodName !== 'renderToString') {
        test('does not modify component directly', () => {
            const wrapper = mount(componentWithNestedChildren, {
                stubs: {
                    'child-component': '<xxx />'
                }
            });

            expect(wrapper.findAll(component).length).toEqual(0);

            const mountedWrapper = mount(componentWithNestedChildren);
            expect(mountedWrapper.findAll(component).length).toEqual(1);
        });

        test('does not modify component directly with a class component', () => {
            const wrapper = mount(componentAsAClass, {
                stubs: {
                    'child-component': '<span />'
                }
            });
            expect(wrapper.findAll(component).length).toEqual(0);

            const mountedWrapper = mount(componentAsAClass);
            expect(mountedWrapper.findAll(component).length).toEqual(1);
        });
    }

    test('stubs components on component if they do not already exist', () => {
        const componentWithGlobalComponent = {
            template: '<span><registered-component /></span>'
        };
        const wrapper = mount(componentWithGlobalComponent, {
            stubs: {
                'registered-component': component
            }
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('</div>');
    });

    test('stubs components with dummy when passed as an array', () => {
        const componentWithGlobalComponent = {
            template: '<span><registered-component /></span>'
        };
        const wrapper = mount(componentWithGlobalComponent, {
            stubs: ['registered-component']
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('<registered-component-stub>');
    });

    if (methodName !== 'shallowMount') {
        test('stubs nested components', () => {
            const grandChildComponent = san.defineComponent({
                template: '<span />'
            });
            const childComponent = san.defineComponent({
                template: '<div><grand-child-component /></div>',
                components: {
                    'grand-child-component': grandChildComponent
                }
            });
            const testComponent = san.defineComponent({
                template: '<div><child-component /></div>',
                components: {
                    'child-component': childComponent
                }
            });

            const wrapper = mount(testComponent, {
                stubs: ['grand-child-component']
            });

            const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
            expect(HTML).not.toContain('<span>');
        });
    }

    test('renders slot content in stubs', () => {
        const TestComponent = {
            template: `<div>
                <stub-with-child>
                    <child-component />
                </stub-with-child>
            </div>`
        };
        const wrapper = mount(TestComponent, {
            stubs: ['child-component', 'stub-with-child']
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('<child-component-stub>');
    });

    if (methodName !== 'renderToString') {
        test('stubs components with dummy which has name when passed a boolean', () => {
            const wrapper = mount({
                template: `<div>
                    <registered-component />
                </div>`
            }, {
                stubs: {
                    'registered-component': true
                }
            });
            const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
            expect(HTML).toContain('<registered-component-stub>');
        });
    }

    test('stubs components with dummy when passed as an array', () => {
        const TestComponent = {
            template: '<div><registered-component /></div>'
        };
        const invalidValues = [{}, [], 3];
        const error = '[san-test-utils]: each item in an options.stubs array must be a string';
        invalidValues.forEach(invalidValue => {
            const fn = () =>
                mount(TestComponent, {
                    stubs: [invalidValue]
                });
            expect(fn).toThrow(new Error(error));
        });
    });

    if (methodName !== 'shallowMount') {
        test('does not stub component when set to false', () => {
            const wrapper = mount(componentWithChild, {
                stubs: {
                    'child-component': false
                }
            });
            const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
            expect(HTML).toContain('<span><div></div></span>');
        });
    }

    test('combines with stubs from config', () => {
        config.stubs['time-component'] = '<br />';

        const TestComponent = {
            template: `<div>
                <span-component />
                <time-component />
            </div>`
        };

        const wrapper = mount(TestComponent, {
            stubs: {
                'span-component': '<p />'
            }
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('<br>');
        expect(HTML).toContain('<p>');
    });

    it('prioritize mounting options over config', () => {
        config.stubs['time-component'] = '<p />';
        const TestComponent = {
            template: `<div>
                <time-component />
            </div>`
        };

        const wrapper = mount(TestComponent, {
            stubs: {
                'time-component': '<span />'
            }
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('<span>');
    });

    if (methodName !== 'shallowMount' && methodName !== 'renderToString') {
        test('stubs on child components', () => {
            const TestComponent = {
                template: '<div><transition></transition></div>'
            };
            const wrapper = mount(
                {
                    components: {
                        'test-component': TestComponent
                    },
                    template: '<div><test-component /></div>'
                },
                {
                    stubs: {
                        transition: 'time'
                    }
                }
            );
            expect(wrapper.find('time').exists()).toEqual(false);
        });
    }

    test('config handles stubs as an array', () => {
        config.stubs['time-component'] = '<p />';
        const TestComponent = {
            template: '<div><time-component /></div>'
        };

        const wrapper = mount(TestComponent, {
            stubs: ['a-component']
        });

        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('</p>');
    });

    test('throws an error when passed a circular reference', () => {
        const validValues = [
            '<NAME-suffix />',
            '<prefix-NAME />',
            '<cmp NAME></cmp>',
            '<cmp something="NAME"></cmp>',
            '<NAMEl />'
        ];
        const invalidValues = [
            '<NAME />',
            '<NAME   />',
            '<NAME></NAME>',
            '<NAME aProp="something"></NAME>',
            '<NAME  ></NAME>'
        ];
        const error = '[san-test-utils]: options.stub cannot contain a circular reference';
        invalidValues.forEach(invalidValue => {
            const fn = () =>
                mount(componentWithChild, {
                    stubs: {
                        'child-component': invalidValue.replace(/NAME/g, 'child-component')
                    }
                });
            expect(fn).toThrow(new Error(error));
        });
        validValues.forEach(validValue => {
            mount(componentWithChild, {
                stubs: {
                    'child-component': validValue.replace(/NAME/g, name)
                }
            });
        });
    });

    test('throws an error when passed an invalid value as stub', () => {
        const error = '[san-test-utils]: options.stub values must be passed a string or component';
        const invalidValues = [1, null, [], {}, NaN];
        invalidValues.forEach(invalidValue => {
            const fn = () => mount(componentWithChild, {
                stubs: {
                    'child-component': invalidValue
                }
            });
            expect(fn).toThrow(new Error(error));
        });
    });

    if (methodName !== 'renderToString') {
        test('uses original component stub', () => {
            const Stub = san.defineComponent({
                template: '<div />'
            });
            const ToStub = san.defineComponent({
                template: '<div />'
            });
            const TestComponent = {
                template: '<div><to-stub /></div>',
                components: {
                    'to-stub': ToStub
                }
            };
            const wrapper = mount(TestComponent, {
                stubs: {
                    'to-stub': Stub
                }
            });
            expect(wrapper.find(ToStub).exists()).toEqual(false);
            expect(wrapper.find(Stub).exists()).toEqual(true);
        });
    }
});
