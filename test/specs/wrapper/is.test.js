/**
 * @file san test utils wrapper is test file
 **/

import {describeWithShallowAndMount} from '../../utils';
import component from '../../resources/component';
import componentAsAClass from '../../resources/component-as-a-class';
import componentWithChild from '../../resources/component-with-child';

/* global test */
describeWithShallowAndMount('is', mount => {
    test('return true if root node matches tag selector', () => {
        const wrapper = mount({
            template: '<input />'
        });
        expect(wrapper.is('input')).toEqual(true);
    });


    test('return true if root node matches class selector', () => {
        const wrapper = mount({
            template: '<div class="div" />'
        });
        expect(wrapper.is('.div')).toEqual(true);
    });

    test('return true if root node matches id selector', () => {
        const wrapper = mount({
            template: '<div id="div" />'
        });
        expect(wrapper.is('#div')).toEqual(true);
    });

    test('return true if root node matches component', () => {
        const wrapper = mount(component);
        expect(wrapper.is(component)).toEqual(true);
    });

    test('returns true if root node matches San component selector', () => {
        const wrapper = mount(componentWithChild);
        const comp = wrapper.find(component);
        expect(comp.is(component)).toEqual(true);
    });

    test('returns true if root node matches Component extending class component', () => {
        const wrapper = mount(componentAsAClass);

        expect(wrapper.is(componentAsAClass)).toEqual(true);
    });
    return;

    test('returns false if root node is not a San Component', () => {
        const wrapper = mount(componentWithChild);
        const input = wrapper.find('span');
        expect(input.is(component)).toEqual(false);
    });

    test('returns false if root node does not match tag selector', () => {
        const wrapper = mount(component);
        expect(wrapper.is('p')).toEqual(false);
    });

    test('returns false if root node does not match class selector', () => {
        const wrapper = mount(component);
        expect(wrapper.is('.p')).toEqual(false);
    });

    test('returns false if root node does not match id selector', () => {
        const wrapper = mount(component);
        expect(wrapper.is('#p')).toEqual(false);
    });

    test('throws error if ref options object is passed', () => {
        const wrapper = mount(component);

        const message = '[san-test-utils]: $ref selectors can not be used with wrapper.is()';
        const fn = () => wrapper.is({ref: 'foo'});
        expect(fn).toThrow(new Error(message));
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
            /* eslint-disable max-len */
            const message = '[san-test-utils]: wrapper.is() must be passed a valid CSS selector, San component, or valid find option object';
            const fn = () => wrapper.is(invalidSelector);
            expect(fn).toThrow(new Error(message));
        });
    });
});
