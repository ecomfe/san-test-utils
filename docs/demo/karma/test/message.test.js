/**
 * @file karma demo file
 **/

import {expect} from 'chai';
import {shallowAttach} from 'san-test-utils';
import message from '@/components/message.san';

describe('Message', () => {
    it('renders msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowAttach(message, {
            data: {msg}
        });
        expect(wrapper.text()).to.equal(msg);
    });

    it('renders default message if not passed a data', () => {
        const defaultMessage = 'default message';
        const wrapper = shallowAttach(message);
        expect(wrapper.text()).to.equal(defaultMessage);
    });
});
