/**
 * @file san test utils wrapper array filter test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
/* eslint-disable max-len */
describeWithShallowAndAttach('filter', attach => {
    test('return filtered wrapper when filter is called', () => {
        const wrapper = attach({
            template: '<div><p class="foo" /><p class="bar" /></div>'
        });
        const filtered = wrapper.findAll('p').filter(component => {
            return component.classes().includes('foo');
        });
        expect(filtered.at(0).classes()).toContain('foo');
        expect(filtered.length).toEqual(1);
    });

    test('return filtered wrapper when filter is called with raw html', () => {
        const wrapper = attach({
            initData() {
                return {
                    html: '<p class="foo" /><p class="bar" />'
                };
            },
            template: '<div>{{html | raw}}</div>'
        });

        const filtered = wrapper.findAll('p').filter(component => {
            return component.classes().includes('foo');
        });
        expect(filtered.at(0).classes()).toContain('foo');
        expect(filtered.length).toEqual(1);
    });
});
