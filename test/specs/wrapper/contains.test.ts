/**
 * @file san test utils wrapper contains test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import component from '../../resources/component';
import componentWithChild from '../../resources/component-with-child';
import componentWithSlot from '../../resources/component-with-slot';
import componentAsAClass from '../../resources/component-as-a-class';
import componentWithoutName from '../../resources/component-without-name';

/* global test */
describeWithShallowAndAttach('contains', attach => {
    test('returns true if wrapper contains element', () => {
        const wrapper = attach({
            template: '<div><input /></div>'
        });
        expect(wrapper.contains('input')).toEqual(true);
    });

    test('returns true if wrapper contains San component', () => {
        const wrapper = attach(componentWithChild);
        expect(wrapper.contains(component)).toEqual(true);
    });

    test('returns true if wrapper contains San component with slot', () => {
        const wrapper = attach({
            components: {
                'component-with-slot': componentWithSlot,
                'component': component
            },
            template: `<div><component-with-slot>
                <component />
            </component-with-slot></div>`
        });
        expect(wrapper.contains(component)).toEqual(true);
    });

    test('returns true if wrapper contains San class component', () => {
        const wrapper = attach({
            components: {
                'component-as-a-class': componentAsAClass
            },
            template: `<div>
                <component-as-a-class />
            </div>`
        });
        expect(wrapper.contains(componentAsAClass)).toEqual(true);
    });

    test('returns true if wrapper contains element specified by ref selector', () => {
        const wrapper = attach({
            template: '<div><input s-ref="foo" /></div>'
        });
        expect(wrapper.contains({ref: 'foo'})).toEqual(true);
    });

    test('throws an error when ref selector is called on a wrapper that is not a San component', () => {
        const wrapper = attach({
            template: '<div><a href="/">href</a></div>'
        });
        const a = wrapper.find('a');
        const message = '[san-test-utils]: $ref selectors can only be used on San component wrappers';
        const fn = () => a.contains({ref: 'foo'});
        expect(fn).toThrowError(new Error(message));
    });

    test('returns true if wrapper root Component matches selector', () => {
        const wrapper = attach(component);
        expect(wrapper.contains(component)).toEqual(true);
    });

    test('returns false if wrapper does not contain element', () => {
        const wrapper = attach(componentWithoutName);
        expect(wrapper.contains('div')).toEqual(true);
    });

    test('returns false if wrapper does not contain element specified by ref selector', () => {
        const wrapper = attach({
            template: '<div><input s-ref="bar" /></div>'
        });
        expect(wrapper.contains({ref: 'foo'})).toEqual(false);
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
            {name: undefined},
            []
        ];
        /* eslint-disable max-len */
        invalidSelectors.forEach(invalidSelector => {
            const message = '[san-test-utils]: wrapper.contains() must be passed a valid CSS selector, San component, or valid find option object';
            const fn = () => wrapper.contains(invalidSelector);
            expect(fn).toThrowError(new Error(message));
        });
    });
});
