/**
 * @file san test utils wrapper find test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithSlot from '../../resources/component-with-slot';
import component from '../../resources/component';
import componentWithChild from '../../resources/component-with-child';
import componentAsAClass from '../../resources/component-as-a-class';
import componentWithSFor from '../../resources/component-with-s-for';

/* global test */
describeWithShallowAndAttach('find', (attach, methodName) => {
    test('returns a Wrapper matching tag selector passed', () => {
        const wrapper = attach({
            template: '<div><p /><p /></div>'
        });
        expect(wrapper.find('p').el).toBeInstanceOf(Element);
    });

    test('returns a wrapper matching class selector passed', () => {
        const wrapper = attach({
            template: '<div><div class="foo" /></div>'
        });

        expect(wrapper.find('.foo').el).toBeInstanceOf(Element);
    });

    /* eslint-disable max-len */
    test('returns an array of Wrapper of elements matching class selector passed if they are declared inside a slot', () => {
        const wrapper = attach({
            components: {
                'component-with-slot': componentWithSlot
            },
            template: `<div>
                <component-with-slot>
                    <div class="foo"></div>
                </component-with-slot>
            </div>`
        });

        expect(wrapper.find('.foo').el).toBeInstanceOf(Element);
    });

    test('returns Wrapper of elements matching id selector passed', () => {
        const wrapper = attach({
            template: '<div><div id="foo" /></div>'
        });
        expect(wrapper.find('#foo').el).toBeInstanceOf(Element);
    });

    test('returns matching nested component', () => {
        const childComponent = san.defineComponent({
            name: 'child-component',
            template: '<div />',
            initData() {
                return {
                    name: 'child-component'
                };
            }
        });
        const wrapper = attach({
            components: {
                'child-component': childComponent
            },
            template: '<div><child-component /></div>'
        });

        expect(wrapper.find(childComponent).vm.name).toEqual('child-component');
    });

    test('returns Wrapper of elements matching attributes selector passed', () => {
        const wrapper = attach({
            template: '<div><a href="/" /></div>'
        });
        expect(wrapper.find('[href="/"]').el).toBeInstanceOf(Element);
    });


    test('throws an error when passed an invalid DOM selector', () => {
        const wrapper = attach({
            template: '<div><a href="/" /></div>'
        });
        const message = '[san-test-utils]: wrapper.find() must be passed a valid CSS selector, San component, or valid find option object';
        const fn = () => wrapper.find('[href=&6"/"]');
        expect(fn).toThrow(new Error(message));
    });

    test('returns Wrapper of elements matching selector when descendant combinator passed', () => {
        const wrapper = attach({
            template: '<div><ul><li>list</li>item<li></li></ul></div>'
        });
        expect(wrapper.find('div li').el).toBeInstanceOf(Element);
    });

    test('returns Wrapper of elements matching selector when direct descendant combinator passed', () => {
        const wrapper = attach({
            template: '<div><ul><li>list</li>item<li></li></ul></div>'
        });
        expect(wrapper.find('div > ul').el).toBeInstanceOf(Element);
    });

    test('returns Wrapper of elements matching pseudo selector passed', () => {
        const wrapper = attach({
            template: '<div><p /><p /></div>'
        });
        expect(wrapper.find('p:first-of-type').el).toBeInstanceOf(Element);
    });

    test('returns Wrapper of San Components matching component', () => {
        const wrapper = attach(componentWithChild);
        expect(wrapper.find(component).el).toBeInstanceOf(Element);
    });

    test('returns Wrapper of class component', () => {
        const wrapper = attach(componentAsAClass);
        expect(wrapper.find(componentAsAClass).el).toBeInstanceOf(Element);
    });

    if (methodName !== 'shallowAttach') {
        test('follows DOM tree order', () => {
            const wrapper = attach({
                components: {
                    'component-2': {
                        template: '<div class="2" />'
                    }
                },
                template: `<main>
                <div class="1">
                    <div class="1a"><div class="1aa" /></div>
                    <div class="1b" />
                </div>
                <component-2 />
                <div class="3" />
            </main>`
            });
            const wrappers = wrapper.findAll('div').wrappers;
            const expectClasses = ['1', '1a', '1aa', '1b', '2', '3'];
            wrappers.forEach((w, i) => {
                expect(w.classes()).toContain(expectClasses[i]);
            });
        });
    }

    test('throws error when using ref selector on an element Wrapper', () => {
        const wrapper = attach({
            template: '<div><svg /></div>'
        });
        const fn = () => wrapper.find('svg').find({ref: 'some-ref'});
        const message = '[san-test-utils]: $ref selectors can only be used on San component wrappers';
        expect(fn).toThrow(new Error(message));
    });

    test('returns correct number of San Wrappers when component has a s-for', () => {
        const items = [{id: 1}, {id: 2}, {id: 3}];
        const wrapper = attach(componentWithSFor, {data: {items}});

        expect(wrapper.find(component).el).toBeInstanceOf(Element);
    });

    test('selector works between attachs', () => {
        const wrapper = attach({
            components: {
                'child-component': component
            },
            template: '<div><child-component /></div>'
        });

        attach(component);
        expect(wrapper.find(component).el).toBeInstanceOf(Element);
    });

    test('returns empty Wrapper with error if no nodes are found', () => {
        const wrapper = attach(component);
        const selector = 'pre';
        const error = wrapper.find(selector);
        expect(error.exists()).toEqual(false);
        expect(error.selector).toEqual(selector);
    });

    test('returns empty Wrapper with error if no nodes are found when passed a component', () => {
        const wrapper = attach(component);
        const error = wrapper.find(componentWithChild);
        expect(error.exists()).toEqual(false);
        expect(error.selector).toEqual('Component');
    });

    test('returns Wrapper of elements matching the ref in options object', () => {
        const wrapper = attach({
            template: '<div><p ref="foo"></p></div>'
        });
        expect(wrapper.find({ref: 'foo'})).toBeInstanceOf(Object);
    });

    test('returns Wrapper of San Component matching the ref in options object', () => {
        const wrapper = attach(componentWithChild);
        expect(wrapper.find({ref: 'child'}).isSanInstance()).toEqual(true);
    });

    test('returns empty Wrapper with error if no nodes are found via ref in options object', () => {
        const wrapper = attach(component);
        const error = wrapper.find({ref: 'foo'});
        expect(error.exists()).toEqual(false);
        expect(error.selector).toEqual('ref="foo"');
    });

    test('throws an error if selector is not a valid selector', () => {
        const wrapper = attach(component);
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
            const message = '[san-test-utils]: wrapper.find() must be passed a valid CSS selector, San component, or valid find option object';
            const fn = () => wrapper.find(invalidSelector);
            expect(fn).toThrow(new Error(message));
        });
    });

    test('handles unnamed components use s-if', done => {
        const wrapper = attach({
            components: {
                component
            },
            initData() {
                return {
                    renderChild: false
                };
            },
            template: `<div>
                <component s-if="renderChild" />
            </div>`
        });

        expect(wrapper.find(component).el).toBeUndefined();
        wrapper.vm.data.set('renderChild', true);
        wrapper.vm.nextTick(() => {
            expect(wrapper.find(component).el).toBeInstanceOf(Element);
            done();
        });
    });
});
