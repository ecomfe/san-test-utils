/**
 * @file san test utils wrapper text test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('text', attach => {
    test('return text content of wrapper node', () => {
        const wrapper = attach({
            template: '<div>test text data</div>'
        });
        expect(wrapper.text()).toEqual('test text data');
    });

    test('return trimmed text content of wrapper node', () => {
        const wrapper = attach({
            template: `<div>
                test text data
            </div>`
        });
        expect(wrapper.text()).toEqual('test text data');
    });
});
