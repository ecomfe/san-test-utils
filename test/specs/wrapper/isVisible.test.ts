/**
 * @file san test utils wrapper is visible test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithSIf from '../../resources/component-with-s-if';

/* global test */
describeWithShallowAndAttach('is visible', attach => {
    test('return true if element has no inline style', () => {
        const wrapper = attach({
            template: '<div><div><span class="visible" /></div></div>'
        });
        const element = wrapper.find('.visible');
        expect(element.isVisible()).toEqual(true);
    });

    test('return false if element has inline style display: none', () => {
        const wrapper = attach({
            template: '<div><div><span class="visible" style="display: none;" /></div></div>'
        });
        const element = wrapper.find('.visible');
        expect(element.isVisible()).toEqual(false);
    });

    test('return false if element has inline style visibility: hidden', () => {
        const wrapper = attach({
            template: '<div><div><span class="visible" style="visibility: hidden" /></div></div>'
        });
        const element = wrapper.find('.visible');
        expect(element.isVisible()).toEqual(false);
    });

    test('return true if element has hidden attributes', () => {
        const wrapper = attach({
            template: '<div><div><span class="visible" hidden /></div></div>'
        });
        const element = wrapper.find('.visible');
        expect(element.isVisible()).toEqual(true);
    });

    test('return true if element has s-if true', done => {
        const wrapper = attach(componentWithSIf);
        wrapper.vm.data.set('ready', true);
        san.nextTick(() => {
            const notReadyElement = wrapper.find('.not-ready');
            const readyElement = wrapper.find('.parent.ready');
            expect(notReadyElement.isVisible()).toEqual(false);
            expect(readyElement.isVisible()).toEqual(true);
            done();
        });
    });

    test('return true if parent element has s-if true', done => {
        const wrapper = attach(componentWithSIf);
        wrapper.vm.data.set('ready', true);
        san.nextTick(() => {
            const notReadyElement = wrapper.find('.not-ready');
            const readyElement = wrapper.find('.child.ready');
            expect(notReadyElement.isVisible()).toEqual(false);
            expect(readyElement.isVisible()).toEqual(true);
            done();
        });
    });

    test('return false if root element has s-if true and parent has s-if false', done => {
        const wrapper = attach(componentWithSIf);
        wrapper.vm.data.set('ready', false);
        wrapper.vm.data.set('rootReady', true);
        san.nextTick(() => {
            const notReadyElement = wrapper.find('.not-ready');
            const readyElement = wrapper.find('.child.ready');
            expect(notReadyElement.isVisible()).toEqual(true);
            expect(readyElement.isVisible()).toEqual(false);
            done();
        });
    });

    test('return false if one element is absent', done => {
        const wrapper = attach(componentWithSIf);
        wrapper.vm.data.set('ready', false);
        san.nextTick(() => {
            const readyElement = wrapper.find('.child.ready');
            expect(readyElement.isVisible()).toEqual(false);
            done();
        });
    });

    test('return true if one element is present', done => {
        const wrapper = attach(componentWithSIf);
        wrapper.vm.data.set('ready', true);
        san.nextTick(() => {
            const readyElement = wrapper.find('.child.ready');
            expect(readyElement.isVisible()).toEqual(true);
            done();
        });
    });
});
