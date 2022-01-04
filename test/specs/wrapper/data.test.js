/**
 * @file san test utils wrapper is san instance test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('data', attach => {
    test('returns true if wrapper has prop', () => {
        const prop1 = {};
        const prop2 = 'string val';
        const wrapper = attach({
            template: '<div></div>'
        }, {
            data: {prop1, prop2}
        });
        expect(wrapper.data()).toEqual({prop1: {}, prop2: 'string val'});
    });

    test('returns an empty object if wrapper does not have data', () => {
        const wrapper = attach({
            template: '<div />'
        });
        expect(wrapper.data()).toEqual({});
    });

    test('should update after setData', () => {
        const prop1 = {};
        const prop2 = 'string val';
        const wrapper = attach({
            template: '<div></div>'
        }, {
            data: {prop1, prop2}
        });
        expect(wrapper.data()).toEqual({prop1: {}, prop2: 'string val'});
        wrapper.vm.data.set('prop2', 'val2');
        expect(wrapper.vm.data.get('prop2')).toEqual('val2');
        expect(wrapper.data()).toEqual({prop1: {}, prop2: 'val2'});
    });

    test('returns default data', () => {
        const wrapper = attach({
            template: '<div />',
            initData() {
                return {
                    message: 'hello'
                };
            }
        });
        expect(wrapper.data().message).toEqual('hello');
    });

    test('throw an error if called on a non vm wrapper', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        const p = wrapper.find('p');
        const message = '[san-test-utils]: wrapper.data() must be called on a San instance';
        const fn = () => p.data();
        expect(fn).toThrow(new Error(message));
    });

    test('returns the given data if a key is provided', () => {
        const prop1 = {};
        const prop2 = 'string val';
        const wrapper = attach({
            template: '<div></div>'
        }, {
            data: {prop1, prop2}
        });
        expect(wrapper.data('prop1')).toEqual({});
        expect(wrapper.data('prop2')).toEqual('string val');
    });

    test('returns undefined if the given key is not found', () => {
        const prop1 = {};
        const prop2 = 'string val';
        const wrapper = attach({
            template: '<div></div>'
        }, {
            data: {prop1, prop2}
        });
        expect(wrapper.data('notfound')).toEqual(undefined);
    });
});
