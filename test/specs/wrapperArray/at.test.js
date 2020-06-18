/**
 * @file san test utils wrapper array at test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('at', mount => {
    test('returns Wrapper at index', () => {
        const testComponent = {
            template: '<div><p /><p class="index-1" /></div>'
        };
        const p = mount(testComponent).findAll('p').at(1);
        expect(p.classes()).toContain('index-1');
    });

    test('throws error if no item exists at index', () => {
        const index = 2;
        const testComponent = {
            template: '<div><p /><p class="index-1" /></div>'
        };
        const message = `[san-test-utils]: no item exists at ${index}`;
        const fn = () => mount(testComponent).findAll('p').at(index);
        expect(fn).toThrow(new Error(message));
    });
});
