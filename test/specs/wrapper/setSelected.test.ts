/**
 * @file san test utils wrapper set selected test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithInput from '../../resources/component-with-input';

/* global test */
describeWithShallowAndAttach('set selected', attach => {
    test('set element selected true', done => {
        const wrapper = attach(componentWithInput);
        const options = wrapper.find('select').findAll('option');
        options.at(1).setSelected();

        san.nextTick(() => {
            expect(options.at(1).el.selected).toEqual(true);
            done();
        });
    });

    test('updates dom with select value', done => {
        const wrapper = attach(componentWithInput);
        const options = wrapper.find('select').findAll('option');

        options.at(1).setSelected();
        san.nextTick(() => {
            expect(wrapper.text()).toContain('selectB');

            options.at(0).setSelected();
            san.nextTick(() => {
                expect(wrapper.text()).toContain('selectA');
                done();
            });
        });
    });

    test('updates dom with select value for select with optgroups', done => {
        const wrapper = attach(componentWithInput);
        const options = wrapper.find('select.with-optgroups').findAll('option');

        options.at(1).setSelected();
        san.nextTick(() => {
            expect(wrapper.text()).toContain('selectB');

            options.at(0).setSelected();
            san.nextTick(() => {
                expect(wrapper.text()).toContain('selectA');
                done();
            });
        });
    });

    test('throws error if element is not valid', () => {
        const message = '[san-test-utils]: wrapper.setSelected() cannot be called on this element';
        const wrapper = attach(componentWithInput);
        const input = wrapper.find('#label-el');

        const fn = () => input.setSelected();
        expect(fn).toThrow(new Error(message));
    });
});
