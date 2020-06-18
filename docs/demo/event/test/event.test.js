/**
 * @file san test utils getting started test file
 **/

import {mount} from '@baidu/san-test-utils';
import quantity from '../quantity';
import click from '../click';
import sinon from 'sinon';

describe('Click event', () => {
    it('Click on yes button calls our method with argument "yes"', () => {
        const spy = sinon.spy();
        const wrapper = mount(click, {
            methods: {
                callMe: spy
            }
        });
        wrapper.find('button.yes').trigger('click');
        spy.calledWith('yes');
    });
});

describe('Key event tests', () => {
    it('Quantity is zero by default', () => {
        const wrapper = mount(quantity);
        expect(wrapper.vm.data.get('quantity')).toBe(0);
    });

    it('Up arrow key increments quantity by 1', () => {
        const wrapper = mount(quantity);
        wrapper.trigger('keydown-up');
        expect(wrapper.vm.data.get('quantity')).toBe(1);
    });

    it('Down arrow key decrements quantity by 1', () => {
        const wrapper = mount(quantity);
        wrapper.vm.data.set('quantity', 5);
        wrapper.trigger('keydown-down');
        expect(wrapper.vm.data.get('quantity')).toBe(4);
    });

    it('Escape sets quantity to 0', () => {
        const wrapper = mount(quantity);
        wrapper.vm.data.set('quantity', 5);
        wrapper.trigger('keydown-esc');
        expect(wrapper.vm.data.get('quantity')).toBe(0);
    });

    it('Magic character "a" sets quantity to 13', () => {
        const wrapper = mount(quantity);
        wrapper.trigger('keydown', {
            key: 'a'
        });
        expect(wrapper.vm.data.get('quantity')).toBe(13);
    });
});
