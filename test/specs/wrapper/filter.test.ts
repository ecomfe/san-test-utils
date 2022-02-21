/**
 * @file san test utils wrapper filter test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('filter', attach => {
    test('throws an error', () => {
        const wrapper = attach({
            template: '<div />'
        });
        const message = '[san-test-utils]: filter() must be called on a WrapperArray';
        const fn = () => wrapper.filter();
        expect(fn).toThrow(new Error(message));
    });

});
