/**
 * @file san test utils wrapper array set checked test file
 **/

import san from 'san';
import {describeWithShallowAndMount} from '../../utils';

/* global test */
describeWithShallowAndMount('set checked test', mount => {
    test('sets value to the input elements of type checkbox or radio', done => {
        const wrapper = mount({
            initData() {
                return {
                    t1: [],
                    t2: ''
                };
            },
            template: `<div>
                <input type="checkbox" name="t1" class="foo" checked="{=t1=}" value="t1" />
                <input type="radio" name="t2" class="foo" checked="{=t2=}" value="foo" />
                <input type="radio" name="t2" class="bar" checked="{=t2=}" value="bar" />
            </div>`
        });

        const wrapperArray = wrapper.findAll('.foo');
        expect(wrapper.vm.data.get('t1')).toEqual([]);
        expect(wrapper.vm.data.get('t2')).toEqual('');
        wrapperArray.setChecked();
        san.nextTick(() => {
            expect(wrapper.vm.data.get('t1')).toEqual(['t1']);
            expect(wrapper.vm.data.get('t2')).toEqual('foo');
            expect(wrapperArray.at(0).el.checked).toEqual(true);
            expect(wrapperArray.at(1).el.checked).toEqual(true);
            done();
        });
    });
});
