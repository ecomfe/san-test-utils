/**
 * @file san test utils wrapper test file
 **/

import {describeWithShallowAndAttach} from '../utils';

/* global test */
describeWithShallowAndAttach('wrapper', attach => {
    test('return true if wrapper is instance of Wrapper', () => {
        const wrapper = attach({
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
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        expect(wrapper.find('p').constructor.name).toEqual('SanWrapper');
    });
});
