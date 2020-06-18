/**
 * @file san test utils wrapper exists test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('exists', mount => {
    test('returns true if called on Wrapper', () => {
        const wrapper = mount({
            template: '<div />'
        });
        expect(wrapper.exists()).toEqual(true);
    });

    test('returns false if Wrapper is detached', () => {
        const wrapper = mount({
            template: '<div />'
        });
        wrapper.detach();
        expect(wrapper.exists()).toEqual(false);
    });

    test('return false if called on an ErrorWrapper', () => {
        const wrapper = mount({
            template: '<div />'
        });
        expect(wrapper.find('p').exists()).toEqual(false);
    });
});
