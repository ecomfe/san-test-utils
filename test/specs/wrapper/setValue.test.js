/**
 * @file san test utils wrapper set value test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithInput from '../../resources/component-with-input';

function shouldThrowErrorOnElement(selector, message, attach) {
    const wrapper = attach(componentWithInput);
    const input = wrapper.find(selector);

    const fn = () => input.setValue('');
    expect(fn).toThrow(new Error('[san-test-utils]: ' + message));
}

/* global test */
describeWithShallowAndAttach('set value', attach => {
    test('set element of input value', () => {
        const wrapper = attach(componentWithInput);
        const input = wrapper.find('input[type="text"]');
        input.setValue('foo');

        expect(input.el.value).toEqual('foo');
    });

    test('sets element of textarea value', () => {
        const wrapper = attach(componentWithInput);
        const textarea = wrapper.find('textarea');
        textarea.setValue('foo');

        expect(textarea.el.value).toEqual('foo');
    });

    test('updates dom with input value', done => {
        const wrapper = attach(componentWithInput);
        const input = wrapper.find('input[type="text"]');
        input.setValue('input text awesome binding');
        san.nextTick(() => {
            expect(wrapper.text()).toContain('input text awesome binding');
            done();
        });
    });

    test('sets element of select value', () => {
        const wrapper = attach(componentWithInput);
        const select = wrapper.find('select');
        select.setValue('selectB');

        expect(select.el.value).toEqual('selectB');
    });

    test('updates dom with select value', done => {
        const wrapper = attach(componentWithInput);
        const select = wrapper.find('select');
        select.setValue('selectB');
        san.nextTick(() => {
            expect(wrapper.text()).toContain('selectB');
            done();
        });
    });

    test('throws error if element is option', () => {
        const message = 'wrapper.setValue() cannot be called on an <option> element. Use wrapper.setSelected() instead';
        shouldThrowErrorOnElement('option', message, attach);
    });

    /* eslint-disable max-len */
    test('throws error if element is radio', () => {
        const message = 'wrapper.setValue() cannot be called on a <input type="radio" /> element. Use wrapper.setChecked() instead';
        shouldThrowErrorOnElement('input[type="radio"]', message, attach);
    });

    test('throws error if element is checkbox', () => {
        const message = 'wrapper.setValue() cannot be called on a <input type="checkbox" /> element. Use wrapper.setChecked() instead';
        shouldThrowErrorOnElement('input[type="checkbox"]', message, attach);
    });

    test('throws error if element is not valid', () => {
        const message = 'wrapper.setValue() cannot be called on this element';
        shouldThrowErrorOnElement('#label-el', message, attach);
    });
});
