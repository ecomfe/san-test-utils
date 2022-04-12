/**
 * @file karma demo file
 **/
import {expect} from 'chai';
import {shallowAttach} from 'san-test-utils';
import list from '@/components/list.san';

describe('list', () => {
    it('renders li for each item in items', () => {
        const items = ['1', '2'];
        const wrapper = shallowAttach(list, {
            data: {items}
        });
        expect(wrapper.findAll('li').length).to.equal(items.length);
    });
});
