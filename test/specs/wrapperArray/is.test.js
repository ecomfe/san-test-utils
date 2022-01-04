/**
 * @file san test utils wrapper array is test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import componentWithChild from '../../resources/component-with-child';
import component from '../../resources/component';

/* global test */
/* eslint-disable max-len */
describeWithShallowAndAttach('is', attach => {
    test('returns true if each item matches selector', () => {
        const testComponent = {
            template: '<div><div></div></div>'
        };
        const wrapper = attach(testComponent);
        const divArr = wrapper.findAll('div');
        expect(divArr.is('div')).toEqual(true);
    });

    test('returns true if each item matches San component selector', () => {
        const wrapper = attach(componentWithChild);
        expect(wrapper.findAll(component).at(0).is(component)).toEqual(true);
    });

    test('returns false if each item is not a San component', () => {
        const wrapper = attach(componentWithChild);
        expect(wrapper.findAll('span').at(0).is(component)).toEqual(false);
    });

    test('returns false if each item does not match tag selector', () => {
        const wrapper = attach({
            template: '<div><div class="a-class"></div><div></div></div>'
        });
        expect(wrapper.findAll('div').is('.a-class')).toEqual(false);
    });

    test('throws error if wrapper array contains no items', () => {
        const testComponent = {
            template: '<div />'
        };
        const message = '[san-test-utils]: is cannot be called on 0 items';
        const fn = () => attach(testComponent).findAll('p').is('p');
        expect(fn).toThrow(new Error(message));
    });

    test('throws error if selector is not a valid selector', () => {
        const testComponent = {
            template: '<div><p></p></div>'
        };
        const wrapper = attach(testComponent);
        const pArr = wrapper.findAll('p');
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
            const message = '[san-test-utils]: wrapper.is() must be passed a valid CSS selector, San component, or valid find option object';
            expect(() => pArr.is(invalidSelector)).toThrow(new Error(message));
        });
    });
});
