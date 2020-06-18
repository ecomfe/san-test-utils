/**
 * @file san test utils wrapper test file
 **/

import {describeWithShallowAndMount} from '../utils';

/* global test */
describeWithShallowAndMount('wrapper', mount => {
    test('return true if wrapper is instance of Wrapper', () => {
        const wrapper = mount({
            initData() {
                return {
                    svg: '<svg />'
                };
            },
            template: '<div>{{svg | raw}}</div>'
        });
        expect(wrapper.find('svg').constructor.name).toEqual('Wrapper');
    });

    test('return true if wrapper is instance of SanWrapper', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });
        expect(wrapper.find('p').constructor.name).toEqual('SanWrapper');
    });
});
