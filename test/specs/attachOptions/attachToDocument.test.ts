/**
 * @file san test utils attach options test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test jest */
describeWithShallowAndAttach('options.attachToDocument', attach => {
    test('attaches root node to document', () => {
        const testComponent = {
            template: '<div class="attached"><input /></div>'
        };
        attach(testComponent, {
            attachToDocument: true
        });
        expect(document.querySelector('.attached')).not.toEqual(null);
    });
});
