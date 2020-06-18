/**
 * @file san test utils mount file
 **/

import san from 'san';
import mount from '../../src/mount';
import shallowMount from '../../src/shallowMount';
import componentWithNestedChildren from '../resources/component-with-nested-children';
import component from '../resources/component';
import componentWithChild from '../resources/component-with-child';
import componentAsAClassWithChild from '../resources/component-as-a-class-with-child';
import sinon from 'sinon';

/* global test jest */
describe('shallow mount', () => {
    beforeEach(() => {
        sinon.stub(console, 'info').callThrough();
        sinon.stub(console, 'error').callThrough();
    });

    afterEach(() => {
        console.info.restore();
        console.error.restore();
    });

    test('return new SanWrapper with mounted San component if no options are passed', () => {
        const wrapper = shallowMount({
            template: '<div><input /></div>'
        });

        expect(wrapper.isSanInstance()).toEqual(true);
        expect(wrapper.vm).toBeDefined();
        expect(wrapper.html()).toEqual('<div><input></div>');
    });

    test('returns new SanWrapper with all children stubbed', () => {
        const wrapper = shallowMount(componentWithNestedChildren);
        expect(wrapper.isSanInstance()).toEqual(true);
        expect(wrapper.findAll(componentWithChild).length).toEqual(1);
        expect(wrapper.findAll(component).length).toEqual(0);
    });

    test('does not modify component directly', () => {
        const wrapper = shallowMount(componentWithNestedChildren);
        expect(wrapper.findAll(component).length).toEqual(0);
        const mountedWrapper = mount(componentWithNestedChildren);

        expect(mountedWrapper.findAll(component).length).toEqual(1);
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
        const wrapper = shallowMount(testComponent);
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
            trimWhitespace: 'all',
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
        const wrapper = shallowMount(testComponent);
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
        const wrapper = shallowMount(testComponent);
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
        const wrapper = shallowMount(testComponent);
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
        const wrapper = shallowMount(testComponent);
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
        const wrapper = shallowMount(testComponent);
        expect(wrapper.html()).toContain('<test-component-stub>');
        expect(console.error).not.called;
    });

    test('does not call stubbed children lifecycle hooks', () => {
        shallowMount(componentWithNestedChildren);
        expect(console.info.called).toEqual(false);
    });

    test('stubs San class component children', () => {
        const wrapper = shallowMount(componentAsAClassWithChild);
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
        const wrapper = shallowMount(testComponent);
        expect(wrapper.contains(component)).toEqual(true);
        expect(wrapper.find(component).exists()).toEqual(true);
        expect(wrapper.findAll(component).length).toEqual(1);
    });

    test('does not stub unregistered components', () => {
        const testComponent = {
            template: '<div><custom-element /></div>'
        };
        const wrapper = shallowMount(testComponent);

        expect(wrapper.html()).toEqual('<div><custom-element></custom-element></div>');
    });

    test('throws an error when the component fails to mount', () => {
        expect(() =>
            shallowMount({
                template: '<div></div>',
                attached() {
                    throw new Error('Error');
                }
            })
        ).toThrow();
    });
});
