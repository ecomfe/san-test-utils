/**
 * @file jest demo file
 **/
import {shallowMount} from '@baidu/san-test-utils';
import message from '@/components/message';

describe('Message', () => {
    it('renders msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(message, {
            data: {msg}
        });
        expect(wrapper.text()).toBe(msg);
    });

    it('renders default message if not passed a data', () => {
        const defaultMessage = 'default message';
        const wrapper = shallowMount(message);
        expect(wrapper.text()).toBe(defaultMessage);
    });
});
