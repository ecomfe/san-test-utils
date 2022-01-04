/**
 * @file mocha demo file
 **/

import {expect} from 'chai';
import san from 'san';
import {shallowAttach} from 'san-test-utils';
import messageToggle from '@/components/messageToggle.san';
import message from '@/components/message.san';

/* eslint-disable max-nested-callbacks */
describe('messageToggle', () => {
    it('toggles msg passed to Message when button is clicked', done => {
        const wrapper = shallowAttach(messageToggle);
        const button = wrapper.find('#toggle-message');
        button.trigger('click');
        san.nextTick(() => {
            const MessageComponent = wrapper.find(message);
            expect(MessageComponent.data('msg')).to.equal('message');
            button.trigger('click');
            san.nextTick(() => {
                expect(MessageComponent.data('msg')).to.equal('toggled message');
                done();
            });
        });
    });
});
