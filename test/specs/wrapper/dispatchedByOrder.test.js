/**
 * @file san test utils wrapper dispatched  by order test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('dispatched by order', mount => {
    test('captures dispatched events in order', () => {
        const wrapper = mount({
            template: '<div />'
        });

        wrapper.vm.dispatch('foo');
        wrapper.vm.dispatch('bar', 123);
        wrapper.vm.dispatch('foo', 234);
        expect(wrapper.dispatchedByOrder()).toEqual([{
            name: 'foo', args: null
        }, {
            name: 'bar', args: 123
        }, {
            name: 'foo', args: 234
        }]);
    });

    test('throws error when called on non SanWrapper', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });
        const message = '[san-test-utils]: wrapper.dispatchedByOrder() can only be called on a San instance';

        const fn = () => wrapper.find('p').dispatchedByOrder();
        expect(fn).toThrow(new Error(message));
    });

    test('captures in lifecycle hook dispatched events in order', () => {
        const wrapper = mount({
            inited() {
                this.dispatch('foo');
            },
            created() {
                this.dispatch('bar', 123);
            },
            attached() {
                this.dispatch('foo', 234);
            },
            template: '<div />'
        });
        expect(wrapper.dispatchedByOrder()).toEqual([{
            name: 'foo', args: null
        }, {
            name: 'bar', args: 123
        }, {
            name: 'foo', args: 234
        }]);
    });
});
