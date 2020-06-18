/**
 * @file san test utils wrapper isEmpty test file
 **/

import {describeWithShallowAndMount} from '../../utils';
import component from '../../resources/component';

/* global test */
describeWithShallowAndMount('isEmpty', mount => {
    test('return true if nodes is empty', () => {
        const wrapper = mount(component);

        expect(wrapper.isEmpty()).toEqual(true);
    });

    test('return true if nodes contains comment', () => {
        const wrapper = mount({
            template: '<div><div s-if="false"></div></div>'
        });

        expect(wrapper.isEmpty()).toEqual(true);

    });

    test('return false if nested child contains renders element', () => {
        const wrapper = mount({
            components: {
                'child-component': {
                    template: '<div />'
                }
            },
            template: '<div><child-component /></div>'
        });
        expect(wrapper.isEmpty()).toEqual(false);
    });

    test('returns true contains empty slot', () => {
        const wrapper = mount({
            template: '<div><slot /></div>'
        });

        expect(wrapper.isEmpty()).toEqual(true);
    });

    test('returns false if node contains other nodes', () => {
        const wrapper = mount({
            template: '<div><p /></div>'
        });

        expect(wrapper.isEmpty()).toEqual(false);
    });
});
