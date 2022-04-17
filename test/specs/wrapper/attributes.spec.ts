/**
 * @file san test utils wrapper attributes test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('attributes', attach => {
    test('returns true if wrapper contains attribute matching value', () => {
        const wrapper = attach({
            template: '<div attribute="value" />'
        });
        expect(wrapper.attributes()).toEqual({attribute: 'value'});
    });

    test('returns empty object if wrapper does not contain any attributes', () => {
        const wrapper = attach({
            template: '<div />'
        });
        expect(wrapper.attributes()).toEqual({});
    });

    test('returns the given attribute if wrapper contains attribute matching value', () => {
        const wrapper = attach({
            template: '<div attribute="value" />'
        });
        expect(wrapper.attributes('attribute')).toEqual('value');
    });

    test('returns undefined if the wrapper does not contain the matching value', () => {
        const wrapper = attach({
            template: '<div attribute="value" />'
        });
        expect(wrapper.attributes('fake')).toEqual(undefined);
    });
});
