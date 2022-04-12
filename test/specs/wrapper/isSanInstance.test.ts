/**
 * @file san test utils wrapper is san instance test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('is san instance', attach => {
    test('return true if wrapper is San instance', () => {
        const wrapper = attach({
            template: '<div></div>'
        });
        expect(wrapper.isSanInstance()).toEqual(true);
    });

    test('return false if wrapper is not a San instance', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        expect(wrapper.find('p').isSanInstance()).toEqual(false);
    });
});
