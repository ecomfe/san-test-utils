/**
 * @file san test utils wrapper array at test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('at', attach => {
    test('returns Wrapper at index', () => {
        const testComponent = {
            template: '<div><p /><p class="index-1" /></div>'
        };
        const p = attach(testComponent).findAll('p').at(1);
        expect(p.classes()).toContain('index-1');
    });

    test('throws error if no item exists at index', () => {
        const index = 2;
        const testComponent = {
            template: '<div><p /><p class="index-1" /></div>'
        };
        const message = `[san-test-utils]: no item exists at ${index}`;
        const fn = () => attach(testComponent).findAll('p').at(index);
        expect(fn).toThrow(new Error(message));
    });
});
