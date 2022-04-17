/**
 * @file san test utils wrapper fire by order test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('firedByOrder', attach => {
    test('captures fired events in order', () => {
        const wrapper = attach({
            template: '<div />'
        });

        wrapper.vm.fire('foo');
        wrapper.vm.fire('bar', 1, 2, 3);
        wrapper.vm.fire('foo', 2, 3, 4);
        expect(wrapper.firedByOrder()).toEqual([{
            name: 'foo', args: []
        }, {
            name: 'bar', args: [1, 2, 3]
        }, {
            name: 'foo', args: [2, 3, 4]
        }]);
    });

    test('throws error when called on non SanWrapper', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        const message = '[san-test-utils]: wrapper.firedByOrder() can only be called on a San instance';

        const fn = () => wrapper.find('p').firedByOrder();
        expect(fn).toThrow(new Error(message));
    });

    test('captures in lifecycle hook fired events in order', () => {
        const wrapper = attach({
            inited() {
                this.fire('foo');
            },
            created() {
                this.fire('bar', 1, 2, 3);
            },
            attached() {
                this.fire('foo', 2, 3, 4);
            },
            template: '<div />'
        });
        expect(wrapper.firedByOrder()).toEqual([{
            name: 'foo', args: []
        }, {
            name: 'bar', args: [1, 2, 3]
        }, {
            name: 'foo', args: [2, 3, 4]
        }]);
    });
});
