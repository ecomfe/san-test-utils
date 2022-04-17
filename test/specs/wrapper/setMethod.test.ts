/**
 * @file san test utils wrapper set method test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import componentWithMethod from '../../resources/component-with-method';
import componentWithEvent from '../../resources/component-with-events';

/* global test */
describeWithShallowAndAttach('set method', attach => {
    test('set component data and updates nested vm nodes when called on San instance', () => {
        const wrapper = attach(componentWithMethod);
        const someMethod = () => {};
        wrapper.setMethods({someMethod});
        expect(wrapper.vm.someMethod).toEqual(someMethod);
    });

    test('throw an error if node is not a San instance', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        const fn = () => wrapper.find('p').setMethods({ready: true});
        const message = '[san-test-utils]: wrapper.setMethods() can only be called on a San instance';
        expect(fn).toThrow(new Error(message));
    });

    test('should replace methods when tied to an event', () => {
        const wrapper = attach(componentWithEvent);
        expect(wrapper.vm.data.get('isActive')).toEqual(false);
        wrapper.find('.toggle').trigger('click');
        expect(wrapper.vm.data.get('isActive')).toEqual(true);
        const toggleActive = () => {};
        wrapper.setMethods({toggleActive});
        wrapper.find('.toggle').trigger('click');
        expect(wrapper.vm.data.get('isActive')).toEqual(true);
    });
});
