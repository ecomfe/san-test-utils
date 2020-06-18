/**
 * @file san test utils wrapper find all test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';
import component from '../../resources/component';
import componentAsAClass from '../../resources/component-as-a-class';
import componentWithSlot from '../../resources/component-with-slot';
import componentWithChild from '../../resources/component-with-child';
import componentWithSFor from '../../resources/component-with-s-for';

/* global test */
/* eslint-disable max-len */
describeWithShallowAndMount('find all', (mount, methodName) => {
    test('return an WrapperArray of elements matching tag selector passed', () => {
        const wrapper = mount({
            template: '<div><p /><p /></div>'
        });
        expect(wrapper.findAll('p').length).toEqual(2);
    });

    test('return an WrapperArray of elements matching class selector passed', () => {
        const wrapper = mount({
            template: '<div><div class="foo" /></div>'
        });
        expect(wrapper.findAll('.foo').length).toEqual(1);
    });

    test('return nodes matching class selector inside a slot', () => {
        const wrapper = mount({
            components: {
                'component-with-slot': componentWithSlot
            },
            template: `<div>
                <component-with-slot>
                    <div class="foo"><div class="foo" /></div>
                </component-with-slot>
            </div>`
        });

        expect(wrapper.findAll('.foo').length).toEqual(2);
    });

    test('works correctly with raw', () => {
        const wrapper = mount({
            initData() {
                return {
                    html: '<svg />'
                };
            },
            template: `<div>
                {{html | raw}}
            </div>`
        });
        expect(wrapper.findAll('svg').length).toEqual(1);
    });

    test('return an WrapperArray of elements matching id selector passed', () => {
        const wrapper = mount({
            template: '<div class="foo"><div id="foo" /></div>'
        });
        expect(wrapper.findAll('#foo').length).toEqual(1);
    });

    test('return an WrapperArray of elements matching attribute selector passed', () => {
        const wrapper = mount({
            template: '<div><a href="/" /></div>'
        });
        expect(wrapper.findAll('[href="/"]').length).toEqual(1);
    });

    test('throws an error when passed an invalid DOM selector', () => {
        const wrapper = mount({
            template: '<div><a href="/" /></div>'
        });
        const message = '[san-test-utils]: wrapper.findAll() must be passed a valid CSS selector, San component, or valid find option object';
        const fn = () => wrapper.findAll('[href=&6"/"]');
        expect(fn).toThrow(new Error(message));
    });

    test('return an array of Wrappers of elements matching selector when descendant combinator passed', () => {
        const wrapper = mount({
            template: '<div><ul><li>list</li>item<li></li></ul></div>'
        });
        expect(wrapper.findAll('div li').length).toEqual(2);
    });

    test('return an array of Wrappers of elements matching selector with direct descendant combinator passed', () => {
        const wrapper = mount({
            template: '<div><ul><ul></ul></ul></div>'
        });
        expect(wrapper.findAll('div > ul').length).toEqual(1);
    });

    test('return an array of Wrappers of elements matching pseudo selector', () => {
        const wrapper = mount({
            template: '<div><p /><p /></div>'
        });
        expect(wrapper.findAll('p:first-of-type').length).toEqual(1);
    });

    test('return an array of SanWrappers of San Components matching component', () => {
        const wrapper = mount(componentWithChild);
        expect(wrapper.findAll(component).length).toEqual(1);
    });

    test('return correct number of San wrapper when component has a s-for', () => {
        const wrapper = mount(componentWithSFor, {
            data: {
                items: [{id: 1}, {id: 2}, {id: 3}]
            }
        });
        expect(wrapper.findAll(component).length).toEqual(3);
    });

    test('return array of SanWrappers of San Components matching component if component name in parent is different to filename', () => {
        const wrapper = mount(componentWithChild);
        const div = wrapper.findAll('span').at(0);
        const componentArr = div.findAll(component);
        expect(componentArr.length).toEqual(1);
    });

    test('only returns San components that exists as children of Wrapper', () => {
        const aComponent = san.defineComponent({
            name: 'acomponent',
            template: '<div />'
        });
        const testComponent = {
            template: `<div>
                <span><a-component /></span>
                <a-component />
            </div>`,
            components: {
                'a-component': aComponent
            }
        };
        const wrapper = mount(testComponent);
        const span = wrapper.find('span');
        expect(span.findAll(aComponent).length).toEqual(1);
    });

    test('return matching San components', () => {
        const testComponent = {
            template: `<div>
                <component />
                <component />
                <component />
            </div>`,
            components: {
                component
            }
        };
        const wrapper = mount(testComponent);
        expect(wrapper.findAll(component).length).toEqual(3);
    });

    test('return Wrapper of class component', () => {
        const wrapper = mount({
            components: {
                'component-as-a-class': componentAsAClass
            },
            template: '<div><component-as-a-class /></div>'
        });
        expect(wrapper.findAll(componentAsAClass).length).toEqual(1);
    });
    return;

    test('return SanWrapper with length 0 if no nodes matching selector are found', () => {
        const wrapper = mount(component);
        const preArray = wrapper.findAll('pre');
        expect(preArray.length).toEqual(0);
        expect(preArray.wrappers).toEqual([]);
    });

    test('return an array of Wrapper of elements matching the ref in options object', () => {
        const wrapper = mount({
            template: '<div><div s-ref="foo" /></div>'
        });
        expect(wrapper.findAll({ref: 'foo'}).length).toEqual(1);
    });

    test('throws an error when ref selector is called on a wrapper that is not a San component', () => {
        const wrapper = mount({
            template: '<div><a href="/"></a></div>'
        });
        const a = wrapper.find('a');
        const message = '[san-test-utils]: $ref selectors can only be used on San component wrappers';
        const fn = () => a.findAll({ref: 'foo'});
        expect(fn).toThrow(new Error(message));
    });

    test('return SanWrapper with length 0 if no nodes matching the ref in options object are found', () => {
        const wrapper = mount(component);
        const preArray = wrapper.findAll({ref: 'foo'});
        expect(preArray.length).toEqual(0);
        expect(preArray.wrappers).toEqual([]);
    });

    test('throws an error if selector is not a valid selector', () => {
        const wrapper = mount(component);
        const invalidSelectors = [
            undefined,
            null,
            NaN,
            0,
            2,
            true,
            false,
            {},
            []
        ];
        invalidSelectors.forEach(invalidSelector => {
            const message = '[san-test-utils]: wrapper.findAll() must be passed a valid CSS selector, San component, or valid find option object';
            const fn = () => wrapper.findAll(invalidSelector);
            expect(fn).toThrow(new Error(message));
        });
    });

    if (methodName !== 'shallowMount') {
        test('return a WrapperArray which inlcudes SanWrapper if the elemens binds a San instance', () => {
            const childComponent = san.defineComponent({
                initData() {
                    return {
                        name: 'bar'
                    };
                },
                template: '<p class="foo" />'
            });
            const wrapper = mount({
                components: {
                    'child-component': childComponent
                },
                initData() {
                    return {
                        name: 'foo'
                    };
                },
                template: '<div class="foo"><p class="foo" /><child-component /></div>'
            });
            const wrappers = wrapper.findAll('.foo');
            expect(wrappers.at(0).vm.data.get('name')).toEqual('foo');
            expect(wrappers.at(1).vm.data).toEqual(undefined);
            expect(wrappers.at(2).vm.data.get('name')).toEqual('bar');
        });
    }
});
