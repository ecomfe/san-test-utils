/**
 * @file san test utils wrapper dispatch test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('dispatched', (attach, methodName) => {
    test('captures dispatched events with a different api', () => {
        const wrapper = attach({
            template: '<div />'
        });

        wrapper.vm.dispatch('foo');
        expect(wrapper.dispatched('foo')).toBeDefined();
        expect(wrapper.dispatched('foo').length).toEqual(1);
        expect(wrapper.dispatched('foo')[0]).toEqual(null);

        expect(wrapper.dispatched('bar')).not.toBeDefined();
        wrapper.vm.dispatch('bar', 123);
        expect(wrapper.dispatched('bar')).toBeDefined();
        expect(wrapper.dispatched('bar').length).toEqual(1);
        expect(wrapper.dispatched('bar')[0]).toEqual(123);

        wrapper.vm.dispatch('foo', 234);
        expect(wrapper.dispatched('foo')).toBeDefined;
        expect(wrapper.dispatched('foo').length).toEqual(2);
        expect(wrapper.dispatched('foo')[1]).toEqual(234);
    });

    test('captures dispatched events', () => {
        const wrapper = attach({
            template: '<div />'
        });

        wrapper.vm.dispatch('foo');
        expect(wrapper.dispatched().foo).toBeDefined();
        expect(wrapper.dispatched().foo.length).toEqual(1);
        expect(wrapper.dispatched().foo[0]).toEqual(null);

        expect(wrapper.dispatched().bar).not.toBeDefined();
        wrapper.vm.dispatch('bar', 123);
        expect(wrapper.dispatched().bar).toBeDefined();
        expect(wrapper.dispatched().bar.length).toEqual(1);
        expect(wrapper.dispatched().bar[0]).toEqual(123);

        wrapper.vm.dispatch('foo', 234);
        expect(wrapper.dispatched().foo).toBeDefined;
        expect(wrapper.dispatched().foo.length).toEqual(2);
        expect(wrapper.dispatched().foo[1]).toEqual(234);
    });

    test('throws error when called on non SanWrapper', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        const message = '[san-test-utils]: wrapper.dispatched() can only be called on a San instance';

        const fn = () => wrapper.find('p').dispatched();
        expect(fn).toThrow(new Error(message));
    });

    test('captures all events thrown after created lifecycle hook', () => {
        const wrapper = attach({
            created() {
                this.dispatch('foo');
            },
            attached() {
                this.dispatch('bar', 12);
            },
            template: '<div />'
        });

        expect(wrapper.dispatched().foo).toEqual([null]);
        expect(wrapper.dispatched().bar).toEqual([12]);
    });

    test('captures only events from its component without side effects', () => {
        const wrapper1 = attach({
            template: '<div />',
            created() {
                this.dispatch('foo');
            }
        });

        const wrapper2 = attach({
            template: '<div />',
            attached() {
                this.dispatch('bar');
            }
        });

        expect(wrapper1.dispatched().foo).toEqual([null]);
        expect(wrapper1.dispatched().bar).toEqual(undefined);
        expect(wrapper2.dispatched().foo).toEqual(undefined);
        expect(wrapper2.dispatched().bar).toEqual([null]);
    });

    if (methodName !== 'shallowAttach') {
        test('works correctly on nested extended components', () => {
            const grandChildComponent = san.defineComponent({
                name: 'grandchildcomponent',
                template: '<span />',
                created() {
                    this.dispatch('foo');
                }
            });

            const childComponent = san.defineComponent({
                components: {
                    'grand-child-component': grandChildComponent
                },
                template: '<a><grand-child-component /></a>'
            });

            const wrapper = attach({
                template: '<div><child-component /></div>',
                components: {
                    'child-component': childComponent
                }
            });
            expect(wrapper.find(grandChildComponent).dispatched('foo')).toBeDefined();
        });
    }
});
