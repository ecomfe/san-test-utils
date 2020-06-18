/**
 * @file san test utils wrapper classes test file
 **/

import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('classes', mount => {
    test('returns array of class names if wrapper has class names', () => {
        const wrapper = mount({
            template: '<div class="a-class b-class" />'
        });
        expect(wrapper.classes()).toContain('a-class');
        expect(wrapper.classes()).toContain('b-class');
    });

    test('returns empty array if wrapper has no classes', () => {
        const wrapper = mount({
            template: '<div />'
        });
        expect(wrapper.classes().length).toEqual(0);
    });

    test('returns array of class names for svg element', () => {
        const wrapper = mount({
            template: '<svg class="a-class b-class"><text class="c-class" /></svg>'
        });
        expect(wrapper.classes()).toContain('a-class');
        expect(wrapper.classes()).toContain('b-class');
        expect(wrapper.find('text').classes()).toContain('c-class');
    });

    test('returns true if the element has the class', () => {
        const wrapper = mount({
            template: '<svg class="a-class b-class"><text class="c-class" /></svg>'
        });
        expect(wrapper.classes('a-class')).toEqual(true);
        expect(wrapper.classes('b-class')).toEqual(true);
        expect(wrapper.find('text').classes('c-class')).toEqual(true);
        expect(wrapper.classes('x-class')).toEqual(false);
    });
});
