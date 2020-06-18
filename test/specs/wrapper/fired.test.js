/**
 * @file san test utils wrapper fire test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('fired', (mount, methodName) => {
    test('captures fired events with a different api', () => {
        const wrapper = mount({
            template: '<div />'
        });

        wrapper.vm.fire('foo');
        expect(wrapper.fired('foo')).toBeDefined();
        expect(wrapper.fired('foo').length).toEqual(1);
        expect(wrapper.fired('foo')[0]).toEqual([]);

        expect(wrapper.fired('bar')).not.toBeDefined();
        wrapper.vm.fire('bar', 1, 2, 3);
        expect(wrapper.fired('bar')).toBeDefined();
        expect(wrapper.fired('bar').length).toEqual(1);
        expect(wrapper.fired('bar')[0]).toEqual([1, 2, 3]);

        wrapper.vm.fire('foo', 2, 3, 4);
        expect(wrapper.fired('foo')).toBeDefined;
        expect(wrapper.fired('foo').length).toEqual(2);
        expect(wrapper.fired('foo')[1]).toEqual([2, 3, 4]);
    });

    test('captures fired events', () => {
        const wrapper = mount({
            template: '<div />'
        });

        wrapper.vm.fire('foo');
        expect(wrapper.fired().foo).toBeDefined();
        expect(wrapper.fired().foo.length).toEqual(1);
        expect(wrapper.fired().foo[0]).toEqual([]);

        expect(wrapper.fired().bar).not.toBeDefined();
        wrapper.vm.fire('bar', 1, 2, 3);
        expect(wrapper.fired().bar).toBeDefined();
        expect(wrapper.fired().bar.length).toEqual(1);
        expect(wrapper.fired().bar[0]).toEqual([1, 2, 3]);

        wrapper.vm.fire('foo', 2, 3, 4);
        expect(wrapper.fired().foo).toBeDefined;
        expect(wrapper.fired().foo.length).toEqual(2);
        expect(wrapper.fired().foo[1]).toEqual([2, 3, 4]);
    });

    test('throws error when called on non SanWrapper', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });
        const message = '[san-test-utils]: wrapper.fired() can only be called on a San instance';

        const fn = () => wrapper.find('p').fired();
        expect(fn).toThrow(new Error(message));
    });

    test('captures all events thrown after created lifecycle hook', () => {
        const wrapper = mount({
            created() {
                this.fire('foo');
            },
            attached() {
                this.fire('bar', 1, 2);
            },
            template: '<div />'
        });

        expect(wrapper.fired().foo).toEqual([[]]);
        expect(wrapper.fired().bar).toEqual([[1, 2]]);
    });

    test('captures only events from its component without side effects', () => {
        const wrapper1 = mount({
            template: '<div />',
            created() {
                this.fire('foo');
            }
        });

        const wrapper2 = mount({
            template: '<div />',
            attached() {
                this.fire('bar');
            }
        });

        expect(wrapper1.fired().foo).toEqual([[]]);
        expect(wrapper1.fired().bar).toEqual(undefined);
        expect(wrapper2.fired().foo).toEqual(undefined);
        expect(wrapper2.fired().bar).toEqual([[]]);
    });

    if (methodName !== 'shallowMount') {
        test('works correctly on nested extended components', () => {
            const grandChildComponent = san.defineComponent({
                name: 'grandchildcomponent',
                template: '<span />',
                created() {
                    this.fire('foo');
                }
            });

            const childComponent = san.defineComponent({
                components: {
                    'grand-child-component': grandChildComponent
                },
                template: '<a><grand-child-component /></a>'
            });

            const wrapper = mount({
                template: '<div><child-component /></div>',
                components: {
                    'child-component': childComponent
                }
            });
            expect(wrapper.find(grandChildComponent).fired('foo')).toBeDefined();
        });
    }
});
