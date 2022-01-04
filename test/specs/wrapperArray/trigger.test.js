/**
 * @file san test utils wrapper array trigger test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import componentWithEvents from '../../resources/component-with-events';
import sinon from 'sinon';

/* global test */
describeWithShallowAndAttach('trigger', attach => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    test('cause click handler to fire when wrapper.trigger("click") is called on a component', () => {
        const clickHandler = sandbox.stub();
        const wrapper = attach(componentWithEvents, {
            methods: {
                clickHandler
            }
        });
        const buttonArr = wrapper.findAll('.click');
        buttonArr.trigger('click');

        expect(clickHandler.calledOnce).toEqual(true);
    });

    test('causes keydown handler to fire when wrapper.trigger("keydown") is fired on a component', () => {
        const keydownHandler = sandbox.stub();
        const wrapper = attach(componentWithEvents, {
            methods: {
                keydownHandler
            }
        });
        wrapper.findAll('.keydown').trigger('keydown');

        expect(keydownHandler.calledOnce).toEqual(true);
    });

    test('causes keydown handler to fire when wrapper.trigger("keydown-enter") is fired on a component', () => {
        const keydownHandler = sandbox.stub();
        const wrapper = attach(componentWithEvents, {
            methods: {
                keydownHandler
            }
        });
        wrapper.findAll('.keydown').trigger('keydown-enter');

        expect(keydownHandler.calledOnce).toEqual(true);
    });

    test('throws an error if type is not a string', () => {
        const wrapper = attach(componentWithEvents);
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

    test('throws error if wrapper array contains no items', () => {
        const message = '[san-test-utils]: trigger cannot be called on 0 items';
        const wrapper = attach({
            template: '<div />'
        });
        const fn = () => wrapper.findAll('p').trigger('p');
        expect(fn).toThrow(new Error(message));
    });
});
