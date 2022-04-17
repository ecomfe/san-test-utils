/**
 * @file san test utils getting started test file
 **/

import san from 'san';
import {attach} from 'san-test-utils';
import counter from '../counter';

describe('counter', () => {
    // 现在挂载组件，你便得到了这个包裹器
    const wrapper = attach(counter);

    it('renders the correct markup', () => {
        expect(wrapper.html()).toContain('<span class="count">0</span>');
    });

    // 也便于检查已存在的元素
    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });

    // 测试+1的情况
    it('button click should increment the count', done => {
        expect(wrapper.vm.data.get('count')).toBe(0);
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.data.get('count')).toBe(1);

        san.nextTick(() => {
            expect(wrapper.html()).toContain('<span class="count">1</span>');
            done();
        });
    });
});
