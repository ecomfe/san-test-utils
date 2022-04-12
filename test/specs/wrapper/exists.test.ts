/**
 * @file san test utils wrapper exists test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('exists', attach => {
    test('returns true if called on Wrapper', () => {
        const wrapper = attach({
            template: '<div />'
        });
        expect(wrapper.exists()).toEqual(true);
    });

    test('returns false if Wrapper is detached', () => {
        const wrapper = attach({
            template: '<div />'
        });
        wrapper.detach();
        expect(wrapper.exists()).toEqual(false);
    });

    test('return false if called on an ErrorWrapper', () => {
        const wrapper = attach({
            template: '<div />'
        });
        expect(wrapper.find('p').exists()).toEqual(false);
    });
});
