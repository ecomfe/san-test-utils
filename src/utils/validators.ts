/**
 * @file san test utils vallidators file
 **/

import {throwError} from './index';
import isPlainObject from 'lodash/isPlainObject';
import { SelectorValue } from '../../types';

export function isDomSelector(selector: SelectorValue) {
    if (typeof selector !== 'string') {
        return false;
    }

    try {
        if (typeof document === 'undefined') {
            throwError('mount must be run in a browser environment like PhantomJS, jsdom or chrome');
        }
    }
    catch (error) {
        throwError('mount must be run in a browser environment like PhantomJS, jsdom or chrome');
    }
    try {
        document.querySelector(selector);
        return true;
    }
    catch (error) {
        return false;
    }
}

export function getSelector(selector: SelectorValue, methodName: string) {
    let type;
    if (isDomSelector(selector)) {
        type = 'DOM_SELECTOR';
    }
    else if (typeof selector === 'function') {
        type = 'COMPONENT_SELECTOR';
    }
    else if (isPlainObject(selector) && typeof selector.ref === 'string') {
        type = 'REF_SELECTOR';
    }
    else {
        type = 'INVALID_SELECTOR';
    }

    if (type === 'INVALID_SELECTOR') {
        throwError(
            `wrapper.${methodName}() must be passed a valid CSS selector, San component, or valid find option object`
        );
    }

    return {
        type,
        value: selector
    };
}
