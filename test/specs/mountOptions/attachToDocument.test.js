/**
 * @file san test utils mount options test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test jest */
describeWithShallowAndMount('options.attachToDocument', mount => {
    test('attaches root node to document', () => {
        const testComponent = {
            template: '<div class="attached"><input /></div>'
        };
        mount(testComponent, {
            attachToDocument: true
        });
        expect(document.querySelector('.attached')).not.toEqual(null);
    });
});
