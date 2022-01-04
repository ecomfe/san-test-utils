/**
 * @file san test utils wrapper array is san instance test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import componentWithChild from '../../resources/component-with-child';
import component from '../../resources/component';

/* global test */
describeWithShallowAndAttach('is san instance', attach => {
    test('returns true if wrapper is San instance', () => {
        const wrapper = attach(componentWithChild);

        expect(wrapper.findAll(component).isSanInstance()).toEqual(true);
    });

    test('returns false if node has inline style display: none', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });

        expect(wrapper.findAll('p').isSanInstance()).toEqual(false);
    });

    test('throws error if wrapper array contains no items', () => {
        const message = '[san-test-utils]: isSanInstance cannot be called on 0 items';
        const wrapper = attach({
            template: '<div />'
        });
        const fn = () => wrapper.findAll('p').isSanInstance('p');
        expect(fn).toThrow(new Error(message));
    });
});
