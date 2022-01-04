/**
 * @file san test utils wrapper array test file
 **/

import sinon from 'sinon';
import {describeWithShallowAndAttach} from '../utils';
import {Wrapper, WrapperArray} from '../../src/wrapper/wrapper';

function getWrapperArray(wrappers) {
    if (!wrappers) {
        wrappers = [1, 2, 3].map(item => {
            const p = document.createElement('p');
            p.textContent = item;
            return new Wrapper(p);
        });
    }
    return new WrapperArray(wrappers);
}

/* global test */
describeWithShallowAndAttach('wrapper array', attach => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    test('return class with length equal to length of wrappers passed in constructor', () => {
        const wrapperArray = getWrapperArray();
        expect(wrapperArray.length).toEqual(3);
    });

    test('return wrapper at index 0 when at(0) is called', () => {
        const wrapperArray = getWrapperArray();
        expect(wrapperArray.at(0).text()).toEqual('1');
    });

    test('return filtered wrapper when filter is called', () => {
        const wrapperArray = getWrapperArray();
        expect(wrapperArray.filter(item => item.text() !== '2').length).toEqual(2);
    });

    test('exists return true if it has every existing wrappers', () => {
        const wrapperArray = getWrapperArray();
        wrapperArray.wrappers.forEach(item => {
            expect(item.exists()).toEqual(true);
        });
        expect(wrapperArray.exists()).toEqual(true);
    });

    test('exists return false if it does not have existing wrappers', () => {
        const wrapperArray = getWrapperArray([]);
        expect(wrapperArray.exists()).toEqual(false);
    });

    test('exists return false if it has not existing wrappers', () => {
        const wrapper1 = {
            exists() {
                return true;
            }
        };
        const wrapper2 = {
            exists() {
                return false;
            }
        };
        const wrapperArray = getWrapperArray([wrapper1, wrapper2]);
        expect(wrapperArray.exists()).toEqual(false);
    });

    test('contains return true if every wrapper.contains() returns true', () => {
        const selector = 'selector';
        const contains = sandbox.stub();
        contains.withArgs(selector).returns(true);
        const wrapperArray = getWrapperArray([{contains}, {contains}]);
        expect(wrapperArray.contains(selector)).toEqual(true);
    });

    test('contains return false if not every wrapper.contains() returns true', () => {
        const wrapperArray = getWrapperArray([
            {contains: () => true},
            {contains: () => false}
        ]);
        expect(wrapperArray.contains()).toEqual(false);
    });

    test('is return true if every wrapper.is() returns true', () => {
        const selector = 'selector';
        const is = sandbox.stub();
        is.withArgs(selector).returns(true);
        const wrapperArray = getWrapperArray([{is}, {is}]);
        expect(wrapperArray.is(selector)).toEqual(true);
    });

    test('is return false if not every wrapper.is() returns true', () => {
        const wrapperArray = getWrapperArray([
            {is: () => true},
            {is: () => false}
        ]);
        expect(wrapperArray.is('selector')).toEqual(false);
    });

    test('isEmpty return true if every wrapper.isEmpty() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isEmpty: () => true},
            {isEmpty: () => true}
        ]);
        expect(wrapperArray.isEmpty()).toEqual(true);
    });

    test('isEmpty return false if not every wrapper.isEmpty() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isEmpty: () => true},
            {isEmpty: () => false}
        ]);
        expect(wrapperArray.isEmpty()).toEqual(false);
    });

    test('isVisible return true if every wrapper.isVisible() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isVisible: () => true},
            {isVisible: () => true}
        ]);
        expect(wrapperArray.isVisible()).toEqual(true);
    });

    test('isVisible return false if not every wrapper.isVisible() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isVisible: () => true},
            {isVisible: () => false}
        ]);
        expect(wrapperArray.isVisible()).toEqual(false);
    });

    test('isSanInstance returns true if every wrapper.isSanInstance() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isSanInstance: () => true},
            {isSanInstance: () => true}
        ]);
        expect(wrapperArray.isSanInstance()).toEqual(true);
    });

    test('isSanInstance returns false if not every wrapper.isSanInstance() returns true', () => {
        const wrapperArray = getWrapperArray([
            {isSanInstance: () => true},
            {isSanInstance: () => false}
        ]);
        expect(wrapperArray.isSanInstance()).toEqual(false);
    });

    test('setMethods calls setMethods on each wrapper', () => {
        const setMethods = sandbox.stub();
        const methods = {};
        const wrapperArray = getWrapperArray([{setMethods}, {setMethods}]);
        wrapperArray.setMethods(methods);
        expect(setMethods.calledTwice).toEqual(true);
        expect(setMethods.calledWith(methods)).toEqual(true);
    });

    test('setData calls setData on each wrapper', () => {
        const setData = sandbox.stub();
        const data = {};
        const wrapperArray = getWrapperArray([{setData}, {setData}]);
        wrapperArray.setData(data);
        expect(setData.calledTwice).toEqual(true);
        expect(setData.calledWith(data)).toEqual(true);
    });

    test('trigger calls trigger on each wrapper', () => {
        const trigger = sandbox.stub();
        const event = 'click';
        const options = {};
        const wrapperArray = getWrapperArray([{trigger}, {trigger}]);
        wrapperArray.trigger(event, options);
        expect(trigger.calledTwice).toEqual(true);
        expect(trigger.calledWith(event, options)).toEqual(true);
    });

    test('calls detach on each wrapper', () => {
        const detach = sandbox.stub();
        const wrapperArray = getWrapperArray([{detach}, {detach}]);
        wrapperArray.detach();
        expect(detach.calledTwice).toEqual(true);
    });
});
