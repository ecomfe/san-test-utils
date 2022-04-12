/**
 * @file san test utils attach file
 **/

import san, { TemplateParseOptionTrimWhitespace } from 'san';
import attach from '../../src/attach';
import shallowAttach from '../../src/shallowAttach';
import componentWithNestedChildren from '../resources/component-with-nested-children';
import component from '../resources/component';
import componentWithChild from '../resources/component-with-child';
import componentAsAClassWithChild from '../resources/component-as-a-class-with-child';
import sinon, { SinonStub } from 'sinon';

/* global test jest */
describe('shallow attach', () => {
    let infoStub: SinonStub | undefined;
    let errorStub: SinonStub | undefined;
    beforeEach(() => {
        infoStub = sinon.stub(console, 'info');
        errorStub = sinon.stub(console, 'error');
        infoStub.callThrough();
        errorStub.callThrough();
    });

    afterEach(() => {
        infoStub.restore();
        errorStub.restore();
    });

    test('return new SanWrapper with attached San component if no options are passed', () => {
        const wrapper = shallowAttach({
            template: '<div><input /></div>'
        });

        expect(wrapper.isSanInstance()).toEqual(true);
        expect(wrapper.vm).toBeDefined();
        expect(wrapper.html()).toEqual('<div><input></div>');
    });

    test('returns new SanWrapper with all children stubbed', () => {
        const wrapper = shallowAttach(componentWithNestedChildren);
        expect(wrapper.isSanInstance()).toEqual(true);
        expect(wrapper.findAll(componentWithChild).length).toEqual(1);
        expect(wrapper.findAll(component).length).toEqual(0);
    });

    test('does not modify component directly', () => {
        const wrapper = shallowAttach(componentWithNestedChildren);
        expect(wrapper.findAll(component).length).toEqual(0);
        const attachedWrapper = attach(componentWithNestedChildren);

        expect(attachedWrapper.findAll(component).length).toEqual(1);
    });

    test('renders children', () => {
        const child = san.defineComponent({
            template: '<div><slot /></div>'
        });
        const testComponent = {
            components: {
                child
            },
            template: '<div><child>Hello</child></div>'
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.htmlNoComment()).toEqual('<div><child-stub>Hello</child-stub></div>');
    });

    test('renders named slots', () => {
        const child = san.defineComponent({
            template: `<div>
                <slot name="header" />
                <slot name="footer" />
            </div>`
        });
        const testComponent = {
            trimWhitespace: 'all' as TemplateParseOptionTrimWhitespace,
            components: {
                child
            },
            template: `<div>
                <child>
                    <p slot="header">Hello</p>
                    <p slot="footer">World</p>
                </child>
            </div>`
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.htmlNoComment()).toEqual(
            '<div><child-stub><p>Hello</p><p>World</p></child-stub></div>'
        );
    });

    test('renders no children if none supplied', () => {
        const testComponent = {
            template: '<div><child /></div>',
            components: {
                child: {}
            }
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.htmlNoComment()).toEqual('<div><child-stub></child-stub></div>');
    });

    test('renders stub data', () => {
        const testComponent = {
            template: '<div><child prop="{{propA}}" attr="hello" /></div>',
            initData() {
                return {
                    propA: 'a'
                };
            },
            components: {
                child: {}
            }
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.htmlNoComment()).toEqual('<div><child-stub prop=\"a\" attr=\"hello\"></child-stub></div>');
    });

    test('renders stub classes', () => {
        const testComponent = {
            template: '<div><child prop="{{propA}}" attr="hello" /></div>',
            initData() {
                return {
                    propA: 'a'
                };
            },
            components: {
                child: {}
            }
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.htmlNoComment()).toEqual('<div><child-stub prop=\"a\" attr=\"hello\"></child-stub></div>');
    });

    test('handles recursive components', () => {
        const testComponent = {
            template: `<div>
                <test-component />
            </div>`,
            components: {
                'test-component': self
            }
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.html()).toContain('<test-component-stub>');
        expect(errorStub.called).toEqual(false);
    });

    test('does not call stubbed children lifecycle hooks', () => {
        shallowAttach(componentWithNestedChildren);
        expect(infoStub.called).toEqual(false);
    });

    test('stubs San class component children', () => {
        const wrapper = shallowAttach(componentAsAClassWithChild);
        expect(wrapper.find(component).exists()).toEqual(true);
        expect(wrapper.findAll('div').length).toEqual(1);
    });

    test('works correctly with find, contains, findAll, and is on named components', () => {
        const testComponent = {
            template: `<div>
                <component />
            </div>`,
            components: {
                component
            }
        };
        const wrapper = shallowAttach(testComponent);
        expect(wrapper.contains(component)).toEqual(true);
        expect(wrapper.find(component).exists()).toEqual(true);
        expect(wrapper.findAll(component).length).toEqual(1);
    });

    test('does not stub unregistered components', () => {
        const testComponent = {
            template: '<div><custom-element /></div>'
        };
        const wrapper = shallowAttach(testComponent);

        expect(wrapper.html()).toEqual('<div><custom-element></custom-element></div>');
    });

    test('throws an error when the component fails to attach', () => {
        expect(() =>
            shallowAttach({
                template: '<div></div>',
                attached() {
                    throw new Error('Error');
                }
            })
        ).toThrow();
    });
});
