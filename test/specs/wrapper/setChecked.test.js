/**
 * @file san test utils wrapper set selected test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';
import componentWithInput from '../../resources/component-with-input';

/* global test */
/* eslint-disable max-len */
/* eslint-disable max-nested-callbacks */
describeWithShallowAndMount('set checked', mount => {
    test('set element checked true with no option passed', () => {
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('input[type="checkbox"]');

        input.setChecked();
        expect(input.el.checked).toEqual(true);
    });

    test('set element checked equal to param passed', () => {
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('input[type="checkbox"]');

        input.setChecked(true);
        expect(input.el.checked).toEqual(true);
        input.setChecked(false);
        expect(input.el.checked).toEqual(false);
    });

    test('update dom with checkbox value', done => {
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('input[type="checkbox"]');

        input.setChecked();
        san.nextTick(() => {
            expect(wrapper.text()).toContain('checkbox checked');

            input.setChecked(false);
            san.nextTick(() => {
                expect(wrapper.text()).not.toContain('checkbox checked');
                done();
            });
        });
    });

    test('changes state the right amount of times with checkbox value', done => {
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('input[type="checkbox"]');

        input.setChecked();
        san.nextTick(() => {
            input.setChecked(false);
            san.nextTick(() => {
                input.setChecked(false);
                san.nextTick(() => {
                    expect(wrapper.find('.counter').text()).toEqual('2');
                    done();
                });
            });
        });
    });

    it('updates dom with radio value', done => {
        const wrapper = mount(componentWithInput);

        wrapper.find('#radioBar').setChecked();
        san.nextTick(() => {
            expect(wrapper.text()).toContain('radioBarResult');
            wrapper.find('#radioFoo').setChecked();
            san.nextTick(() => {
                expect(wrapper.text()).toContain('radioFooResult');
                done();
            });
        });
    });

    test('changes state the right amount of times with radio value', done => {
        const wrapper = mount(componentWithInput);
        const radioBar = wrapper.find('#radioBar');
        const radioFoo = wrapper.find('#radioFoo');

        radioBar.setChecked();
        san.nextTick(() => {
            radioBar.setChecked();
            san.nextTick(() => {
                radioFoo.setChecked();
                san.nextTick(() => {
                    expect(wrapper.find('.counter').text()).toEqual('2');
                    done();
                });
            });
        });
    });

    test('throws error if checked param is not boolean', () => {
        const message = '[san-test-utils]: wrapper.setChecked() must be passed a boolean';
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('input[type="checkbox"]');
        const fn = () => input.setChecked('asdf');
        expect(fn).toThrow(new Error(message));
    });

    test('throws error if checked param is false on radio element', () => {
        const message = '[san-test-utils]: wrapper.setChecked() cannot be called with parameter false on a <input type="radio" /> element';
        const wrapper = mount(componentWithInput);
        const input = wrapper.find('#radioFoo');
        const fn = () => input.setChecked(false);
        expect(fn).toThrow(new Error(message));
    });
});
