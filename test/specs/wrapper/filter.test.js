/**
 * @file san test utils wrapper filter test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('filter', mount => {
    test('throws an error', () => {
        const wrapper = mount({
            template: '<div />'
        });
        const message = '[san-test-utils]: filter() must be called on a WrapperArray';
        const fn = () => wrapper.filter();
        expect(fn).toThrow(new Error(message));
    });

});
