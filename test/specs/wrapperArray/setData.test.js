/**
 * @file san test utils wrapper array set data test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';
import componentWithSIf from '../../resources/component-with-s-if';

/* global test */
describeWithShallowAndMount('set data', mount => {
    test('sets component data and updates nested vm nodes', done => {
        const wrapper = mount(componentWithSIf);
        const componentArr = wrapper.findAll(componentWithSIf);

        expect(componentArr.at(0).findAll('.child.ready').length).toEqual(0);
        componentArr.setData({ready: true});

        san.nextTick(() => {
            expect(componentArr.at(0).findAll('.child.ready').length).toEqual(1);
            done();
        });
    });

    test('throws an error if node is not a San instance', () => {
        const message = '[san-test-utils]: wrapper.setData() must be called on a San instance';
        const wrapper = mount({
            template: '<div><p /></div>'
        });
        const fn = () => wrapper.findAll('p').setData({ready: true});
        expect(fn).toThrow(new Error(message));
    });

    it('throws error if wrapper array contains no items', () => {
        const wrapper = mount({
            template: '<div />'
        });
        const message = '[san-test-utils]: setData cannot be called on 0 items';
        const fn = () => wrapper.findAll('p').setData('p');
        expect(fn).toThrow(new Error(message));
    });
});
