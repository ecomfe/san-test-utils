/**
 * @file san test utils wrapper detach test file
 **/

import {describeWithShallowAndAttach} from '../../utils';
import sinon from 'sinon';

/* global test */
describeWithShallowAndAttach('attributes', attach => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    test('triggers detach', () => {
        const stub = sandbox.stub();
        attach({
            template: '<div attribute="value" />',
            detached() {
                stub();
            }
        }).detach();
        expect(stub.calledOnce).toEqual(true);
    });

    test('removes element from document.body', () => {
        const wrapper = attach({
            template: '<div />'
        }, {
            attachToDocument: true
        });
        expect(wrapper.vm.el.parentNode).toEqual(document.body);
        wrapper.detach();
        expect(wrapper.vm.el.parentNode).toBeNull();
    });
});
