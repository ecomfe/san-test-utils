/**
 * @file san test utils async test file
 **/

/* global jest */
import {attach} from 'san-test-utils';
import async from '../async';
import flushPromises from 'flush-promises';

jest.mock('axios');

describe('Async test', () => {
    it('fetches async when a button is clicked', done => {
        const wrapper = attach(async);
        wrapper.find('button').trigger('click');
        wrapper.vm.nextTick(() => {
            expect(wrapper.data('value')).toEqual('value');
            done();
        });
    });


    it('fetches async when a button is clicked with flushPromises', async () => {
        const wrapper = attach(async);
        wrapper.find('button').trigger('click');
        await flushPromises();
        expect(wrapper.data('value')).toEqual('value');
    });
});
