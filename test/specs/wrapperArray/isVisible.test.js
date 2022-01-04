/**
 * @file san test utils wrapper array is visible test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('is visible', attach => {
    test('returns true if node has no inline style', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });

        expect(wrapper.findAll('p').isVisible()).toEqual(true);
    });

    test('returns false if node has inline style display: none', () => {
        const wrapper = attach({
            template: '<div><p style="display: none;" /><p /></div>'
        });

        expect(wrapper.findAll('p').isVisible()).toEqual(false);
    });

    test('returns false if node has visibility: hidden', () => {
        const wrapper = attach({
            template: '<div><p style="visibility: hidden;" /><p /></div>'
        });

        expect(wrapper.findAll('p').isVisible()).toEqual(false);
    });

    test('throws error if wrapper array contains no items', () => {
        const message = '[san-test-utils]: isVisible cannot be called on 0 items';
        const wrapper = attach({
            template: '<div />'
        });
        const fn = () => wrapper.findAll('p').isVisible('p');
        expect(fn).toThrow(new Error(message));
    });
});
