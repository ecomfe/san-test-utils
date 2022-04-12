/**
 * @file jest demo file
 **/
import {shallowAttach} from 'san-test-utils';
import list from '@/components/list';

describe('list', () => {
    it('renders li for each item in items', () => {
        const items = ['1', '2'];
        const wrapper = shallowAttach(list, {
            data: {items}
        });
        expect(wrapper.findAll('li')).toHaveLength(items.length);
    });

    it('matches snapshot', () => {
        const items = ['item 1', 'item 2'];
        const wrapper = shallowAttach(list, {
            data: {items}
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
});
