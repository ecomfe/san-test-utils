/**
 * @file san test utils attach options test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test jest */
describeWithShallowAndAttach('options.parentComponent', attach => {
    test('attachs component with parent component set to options.parentComponent', () => {
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
        const wrapper = attach(testComponent, {
            parentComponent: parent
        });
        expect(wrapper.vm.parentComponent.data.get('name')).toEqual('Parent Name');
    });

    test('validates parentComponent option', () => {
        ['str', 123, [], () => {}].forEach(invalidParent => {
            const testComponent = {
                template: '<div />'
            };
            const fn = () => attach(testComponent, {
                parentComponent: invalidParent
            });
            const message = '[san-test-utils]: options.parentComponent should be a valid San component';
            expect(fn).toThrow(new Error(message));
        });
    });
});
