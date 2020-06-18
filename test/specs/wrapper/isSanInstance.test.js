/**
 * @file san test utils wrapper is san instance test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('is san instance', mount => {
    test('return true if wrapper is San instance', () => {
        const wrapper = mount({
            template: '<div></div>'
        });
        expect(wrapper.isSanInstance()).toEqual(true);
    });

    test('return false if wrapper is not a San instance', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });
        expect(wrapper.find('p').isSanInstance()).toEqual(false);
    });
});
