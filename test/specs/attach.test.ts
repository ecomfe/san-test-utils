/**
 * @file san test utils attach file
 **/

import san from 'san';
import attach from '../../src/attach';
import ComponentExtendsBase from '../resources/component-extends-base';

/* global test jest */
describe('attach', () => {
    test('return new SanWrapper with attached San component if no options are passed', () => {
        const wrapper = attach({
            template: '<div><input /></div>'
        });

        expect(wrapper.vm).toBeDefined();
        expect(wrapper.html()).toEqual('<div><input></div>');
    });

    test('returns new SanWrapper with correct data', () => {
        const data = {test: 'TEST'};
        const wrapper = attach({
            template: '<div />'
        }, {data: data});
        expect(wrapper.vm).toBeDefined();
        expect(wrapper.vm.data.get()).toEqual(data);
        expect(wrapper.vm.data.get('test')).toEqual('TEST');
    });

    test('overrides methods', () => {
        const stub = jest.fn();
        const TestComponent = san.defineComponent({
            template: '<div />',
            callStub() {
                stub();
            }
        });
        const wrapper = attach(TestComponent, {
            methods: {
                callStub() {}
            }
        });
        wrapper.vm.callStub();
        expect(stub).not.toBeCalled();
    });

    test('overrides prototype', () => {
        const attachedFn = jest.fn();
        const detachedFn = jest.fn();
        const component = san.defineComponent({
            template: '<div />'
        });
        component.prototype.attached = () => {
            attachedFn();
        };
        component.prototype.detached = () => {
            detachedFn();
        };
        const wrapper = attach(component);
        expect(attachedFn).toBeCalled();
        expect(detachedFn).not.toBeCalled();
        wrapper.detach();
        expect(detachedFn).toBeCalled();
    });

    /*test('handles components as dynamic imports', done => {
        const InputComponent = san.defineComponent({
            template: '<input type="text" />'
        });
        const TestComponent = san.defineComponent({
            components: {
                'async-component': san.createComponentLoader(() => {
                    return new Promise(resolve => {
                        resolve(InputComponent);
                    });
                })
            },
            template: `<div>
                <async-component />
            </div>`
        });

        const wrapper = attach(TestComponent);
        setTimeout(() => {
            expect(wrapper.find(InputComponent).exists()).toEqual(true);
            done();
        });
    });*/

    test('propagates errors when they are thrown', () => {
        const testComponent = {
            template: '<div></div>',
            attached() {
                throw new Error('Error in attached');
            }
        };

        const fn = () => attach(testComponent);
        expect(fn).toThrow('Error in attached');
    });

    test('propagates errors when they are thrown by a nested component', () => {
        const rootComponent = {
            components: {
                'child-component': {
                    template: '<div></div>',
                    attached() {
                        throw new Error('Error in attached');
                    }
                }
            },
            template: '<div><child-component /></div>'
        };

        const fn = () => attach(rootComponent);

        expect(fn).toThrow('Error in attached');
    });

    test('adds unused data as attributes', () => {
        const wrapper = attach({
            template: `<div height="{{height}}" extra="{{extra}}">
                <p class="prop-1">{{prop1}}</p>
                <p class="prop-2"></p>
            </div>`
        }, {
            data: {
                height: '50px',
                prop1: 'prop1',
                extra: 'attr'
            }
        });

        expect(wrapper.vm.data.get()).toEqual({height: '50px', prop1: 'prop1', extra: 'attr'});

        expect(wrapper.html()).toEqual(
            `<div height="50px" extra="attr">
                <p class="prop-1">prop1</p>
                <p class="prop-2"></p>
            </div>`
        );
    });

    test('overwrites the component options with the instance options', () => {
        const component = {
            template: '<div>{{foo()}}{{bar()}}{{baz()}}</div>',
            foo() {
                return 'a';
            },
            bar() {
                return 'b';
            }
        };
        const options = {
            methods: {
                bar() {
                    return 'B';
                },
                baz() {
                    return 'C';
                }
            }
        };
        const wrapper = attach(component, options);
        expect(wrapper.text()).toEqual('aBC');
    });

    test('attach class component extends Base class with customMethod()', () => {
        const wrapper = attach(ComponentExtendsBase);
        expect(wrapper.vm).toBeDefined();
        expect(wrapper.data('customContent')).toEqual('customContent');
        wrapper.find('button').trigger('click');
        expect(wrapper.data('customContent')).toEqual('newContent');
    });
});
