/**
 * @file san test utils wrapper text test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('text', mount => {
    test('return text content of wrapper node', () => {
        const wrapper = mount({
            template: '<div>test text data</div>'
        });
        expect(wrapper.text()).toEqual('test text data');
    });

    test('return trimmed text content of wrapper node', () => {
        const wrapper = mount({
            template: `<div>
                test text data
            </div>`
        });
        expect(wrapper.text()).toEqual('test text data');
    });
});
