/**
 * @file san test utils wrapper array is san instance test file
 **/

import {describeWithShallowAndMount} from '../../utils';
import componentWithChild from '../../resources/component-with-child';
import component from '../../resources/component';

/* global test */
describeWithShallowAndMount('is san instance', mount => {
    test('returns true if wrapper is San instance', () => {
        const wrapper = mount(componentWithChild);

        expect(wrapper.findAll(component).isSanInstance()).toEqual(true);
    });

    test('returns false if node has inline style display: none', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });

        expect(wrapper.findAll('p').isSanInstance()).toEqual(false);
    });

    test('throws error if wrapper array contains no items', () => {
        const message = '[san-test-utils]: isSanInstance cannot be called on 0 items';
        const wrapper = mount({
            template: '<div />'
        });
        const fn = () => wrapper.findAll('p').isSanInstance('p');
        expect(fn).toThrow(new Error(message));
    });
});
