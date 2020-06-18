/**
 * @file san test utils mount options test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test jest */
describeWithShallowAndMount('options.parentComponent', mount => {
    test('mounts component with parent component set to options.parentComponent', () => {
        const parent = {
            initData() {
                return {
                    name: 'Parent Name'
                };
            },
            template: '<div />'
        };
        const testComponent = {
            template: '<div />'
        };
        const wrapper = mount(testComponent, {
            parentComponent: parent
        });
        expect(wrapper.vm.parentComponent.data.get('name')).toEqual('Parent Name');
    });

    test('validates parentComponent option', () => {
        ['str', 123, [], () => {}].forEach(invalidParent => {
            const testComponent = {
                template: '<div />'
            };
            const fn = () => mount(testComponent, {
                parentComponent: invalidParent
            });
            const message = '[san-test-utils]: options.parentComponent should be a valid San component';
            expect(fn).toThrow(new Error(message));
        });
    });
});
