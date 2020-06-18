/**
 * @file san test utils wrapper array is empty test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
/* eslint-disable max-len */
describeWithShallowAndMount('is empty', mount => {
    test('returns true if node is empty', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });

        expect(wrapper.findAll('p').isEmpty()).toEqual(true);
    });

    it('returns false if node contains other nodes', () => {
        const wrapper = mount({
            template: '<div><span><p /></span></div>'
        });

        expect(wrapper.findAll('span').isEmpty()).toEqual(false);
    });

    it('throws error if wrapper array contains no items', () => {
        const wrapper = mount({
            template: '<div />'
        });
        const message = '[san-test-utils]: isEmpty cannot be called on 0 items';
        const fn = () => wrapper.findAll('p').isEmpty('p');
        expect(fn).toThrow(new Error(message));
    });
});
