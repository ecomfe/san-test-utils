/**
 * @file san test utils wrapper array contains test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
/* eslint-disable max-len */
describeWithShallowAndAttach('contains', attach => {
    test('returns true if every Wrapper contains element', () => {
        const testComponent = {
            template: '<span><div><p /></div><div><p /></div></span>'
        };
        const wrapper = attach(testComponent);
        const divArr = wrapper.findAll('div');
        expect(divArr.contains('p')).toEqual(true);
    });

    test('returns false if any Wrapper does not contain element', () => {
        const testComponent = {
            template: '<div><div></div><div><p /></div></div>'
        };
        const wrapper = attach(testComponent);
        const divArr = wrapper.findAll('div');
        expect(divArr.contains('p')).toEqual(false);
    });

    test('throws error if wrapper array contains no items', () => {
        const testComponent = {
            template: '<div />'
        };
        const message = '[san-test-utils]: contains cannot be called on 0 items';
        const fn = () => attach(testComponent).findAll('p').contains('p');
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
            const message = '[san-test-utils]: wrapper.contains() must be passed a valid CSS selector, San component, or valid find option object';
            expect(() => pArr.contains(invalidSelector)).toThrow(new Error(message));
        });
    });
});
