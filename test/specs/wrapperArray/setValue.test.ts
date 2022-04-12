/**
 * @file san test utils wrapper array set value test file
 **/

import {describeWithShallowAndAttach} from '../../utils';

/* global test */
describeWithShallowAndAttach('set value', attach => {
    test('sets value to the text-control input elemens', () => {
        const wrapper = attach({
            initData() {
                return {
                    t1: '',
                    t2: ''
                };
            },
            template: `<div>
                <input type="text" name="t1" class="foo" value="{=t1=}" />
                <input type="text" name="t2" class="foo" value="{=t2=}" />
            </div>`
        });
        const wrapperArray = wrapper.findAll('.foo');
        expect(wrapper.vm.data.get('t1')).toEqual('');
        expect(wrapper.vm.data.get('t2')).toEqual('');
        wrapperArray.setValue('foo');
        expect(wrapper.vm.data.get('t1')).toEqual('foo');
        expect(wrapper.vm.data.get('t2')).toEqual('foo');
        expect(wrapperArray.at(0).el.value).toEqual('foo');
        expect(wrapperArray.at(1).el.value).toEqual('foo');
    });

    it('throws error if wrapper array contains no items', () => {
        const wrapper = attach({
            template: '<div />'
        });
        const message = '[san-test-utils]: setValue cannot be called on 0 items';
        const fn = () => wrapper.findAll('p').setValue('p');
        expect(fn).toThrow(new Error(message));
    });
});
