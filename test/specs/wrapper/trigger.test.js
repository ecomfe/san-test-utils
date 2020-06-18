/**
 * @file san test utils wrapper trigger test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';
import component from '../../resources/component';
import componentWithEvents from '../../resources/component-with-events';
import sinon from 'sinon';

/* global test */
describeWithShallowAndMount('trigger', mount => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    test('causes click handler to fire when wrapper.trigger("click") is called on a Component', () => {
        const clickHandler = sandbox.stub();
        const wrapper = mount(componentWithEvents, {
            methods: {
                clickHandler
            }
        });
        const button = wrapper.find('.click');
        button.trigger('click');

        expect(clickHandler.calledOnce).toEqual(true);
    });

    test('causes keydown handler to fire when wrapper.trigger("keydown") is fired on a Component', () => {
        const keydownHandler = sandbox.stub();
        const wrapper = mount(componentWithEvents, {
            methods: {
                keydownHandler
            }
        });
        wrapper.find('.keydown').trigger('keydown');

        expect(keydownHandler.calledOnce).toEqual(true);
    });

    test('causes keydown handler to fire when wrapper.trigger("keydown") is fired on a Component', () => {
        const keydownHandler = sandbox.stub();
        const wrapper = mount(componentWithEvents, {
            methods: {
                keydownHandler
            }
        });
        wrapper.find('.keydown').trigger('keydown-enter');

        expect(keydownHandler.calledOnce).toEqual(true);
    });

    test('convert a registered key name to a key code', () => {
        const modifiers = {
            enter: 13,
            esc: 27,
            tab: 9,
            space: 32,
            delete: 46,
            backspace: 8,
            insert: 45,
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            end: 35,
            home: 36,
            pageup: 33,
            pagedown: 34
        };
        const keyupHandler = sandbox.stub();
        const wrapper = mount(componentWithEvents, {
            methods: {
                keyupHandler
            }
        });
        for (const keyName in modifiers) {
            const keyCode = modifiers[keyName];
            wrapper.find('.keydown').trigger(`keyup-${keyName}`);
            expect(keyupHandler.lastCall.args[0].keyCode).toEqual(keyCode);
        }
    });

    test('causes DOM to update after clickHandler method that changes components data is called', done => {
        const wrapper = mount(componentWithEvents);
        const toggle = wrapper.find('.toggle');
        expect(toggle.classes()).not.toContain('active');
        toggle.trigger('click');
        san.nextTick(() => {
            expect(toggle.classes()).toContain('active');
            done();
        });
    });

    test('adds options to event', () => {
        const clickHandler = sandbox.stub();
        const wrapper = mount(componentWithEvents, {
            methods: {
                clickHandler
            }
        });
        const button = wrapper.find('.left-click');
        button.trigger('mousedown', {
            button: 1
        });
        button.trigger('mousedown', {
            button: 0
        });
        expect(clickHandler.calledOnce).toEqual(true);
    });

    test('adds custom data to events', () => {
        const stub = sandbox.stub();
        const testComponent = {
            template: '<div on-update="callStub" />',
            callStub(event) {
                stub(event.customData);
            }
        };

        const wrapper = mount(testComponent);

        wrapper.trigger('update', {
            customData: 123
        });

        expect(stub.getCall(0).args[0]).toEqual(123);
    });

    test('throws error if options contains a target value', () => {
        const wrapper = mount({
            template: '<div />'
        });
        const div = wrapper.find('div');
        const fn = () =>
            div.trigger('click', {
                target: {}
            });
        const message = '[san-test-utils]: you cannot set the target value of an event';
        expect(fn).toThrow(new Error(message));
    });

    test('throws an error if type is not a string', () => {
        const wrapper = mount(componentWithEvents);
        const invalidSelectors = [
            undefined,
            null,
            NaN,
            0,
            2,
            true,
            false,
            () => {},
            {},
            []
        ];
        invalidSelectors.forEach(invalidSelector => {
            const message = '[san-test-utils]: wrapper.trigger() must be passed a string';
            const fn = () => wrapper.trigger(invalidSelector);
            expect(fn).toThrow(new Error(message));
        });
    });

    test('trigger should create events with correct interface', () => {
        let lastEvent;
        const wrapper = mount({
            template: '<div on-click="updateLastEvent" />',
            updateLastEvent(e) {
                lastEvent = e;
            }
        });
        wrapper.trigger('click');
        expect(lastEvent).toBeInstanceOf(window.MouseEvent);
    });

    test('falls back to supported event if not supported by browser', () => {
        const testComponent = {
            template: '<div />'
        };

        const wrapper = mount(testComponent);
        wrapper.trigger('gamepadconnected');
    });
});
