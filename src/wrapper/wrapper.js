/**
 * @file san test utils wrapper file
 **/

import {getSelector} from '../utils/validators';
import {throwError} from '../utils/index';
import isPlainObject from 'lodash/isPlainObject';
import cloneDeep from 'lodash/cloneDeep';
import find from './find';
import ErrorWrapper from './errorWrapper';
import createDomEvent from './createDomEvent';

/* eslint-disable max-len */
function mergeData(originData, newData) {
    const keys = Object.keys(newData);
    for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        if (isPlainObject(newData[name]) && isPlainObject(originData[name])) {
            mergeData(originData[name], newData[name]);
        }
        else {
            originData[name] = newData[name];
        }
    }
    return {...originData};
}

export class WrapperArray {
    constructor(wrappers) {
        this.wrappers = wrappers;
        this.length = wrappers.length;
    }

    at(index) {
        if (!this.wrappers[index]) {
            throwError('no item exists at ' + index);
        }
        return this.wrappers[index];
    }

    contains(selector) {
        this.throwErrorIfEmpty('contains');
        return this.wrappers.every(wrapper => wrapper.contains(selector));
    }

    detach() {
        this.throwErrorIfEmpty('detach');
        this.wrappers.forEach(wrapper => wrapper.detach());
    }

    exists() {
        return this.length > 0 && this.wrappers.every(wrapper => wrapper.exists());
    }

    filter(fn) {
        return new WrapperArray(this.wrappers.filter(fn));
    }

    is(selector) {
        this.throwErrorIfEmpty('is');
        return this.wrappers.every(wrapper => wrapper.is(selector));
    }

    isEmpty() {
        this.throwErrorIfEmpty('isEmpty');
        return this.wrappers.every(wrapper => wrapper.isEmpty());
    }

    isSanInstance() {
        this.throwErrorIfEmpty('isSanInstance');
        return this.wrappers.every(wrapper => wrapper.isSanInstance());
    }

    isVisible() {
        this.throwErrorIfEmpty('isVisible');
        return this.wrappers.every(wrapper => wrapper.isVisible());
    }

    setChecked() {
        this.throwErrorIfEmpty('setChecked');
        this.wrappers.forEach(wrapper => wrapper.setChecked());
    }

    setData(data) {
        this.throwErrorIfEmpty('setData');
        this.wrappers.forEach(wrapper => wrapper.setData(data));
    }

    setMethods(data) {
        this.throwErrorIfEmpty('setMethods');
        this.wrappers.forEach(wrapper => wrapper.setMethods(data));
    }

    setValue(data) {
        this.throwErrorIfEmpty('setValue');
        this.wrappers.forEach(wrapper => wrapper.setValue(data));
    }

    trigger(type, options = {}) {
        this.throwErrorIfEmpty('trigger');
        this.wrappers.forEach(wrapper => wrapper.trigger(type, options));
    }

    throwErrorIfEmpty(msg) {
        if (this.wrappers.length === 0) {
            throwError(msg + ' cannot be called on 0 items');
        }
    }
}

export class Wrapper {
    constructor(node, options, isSanWrapper) {
        if (!isSanWrapper) {
            this.el = node instanceof Element ? node : node.el;
            this.vm = null;
            this.options = options;
        }
    }

    attributes(key) {
        const attributes = this.el.attributes;
        const attributesMap = {};

        for (let i = 0; i < attributes.length; i++) {
            attributesMap[attributes.item(i).localName] = attributes.item(i).value;
        }

        return key ? attributesMap[key] : attributesMap;
    }

    classes(key) {
        const classes = this.el.classList;

        return key ? classes.contains(key) : [].slice.call(classes);
    }

    contains(selector) {
        const newSelector = getSelector(selector, 'contains');
        return !!find(this.el, this.vm, newSelector).length;
    }

    data(key) {
        if (!this.isSanInstance()) {
            throwError('wrapper.data() must be called on a San instance');
        }
        const data = this.vm.data.get();

        return key ? data[key] : data;
    }

    detach() {
        this.vm.detach();
    }

    dispatched(event) {
        if (!this.isSanInstance()) {
            throwError('wrapper.dispatched() can only be called on a San instance');
        }
        if (event) {
            return this.vm.data.get('_dispatched')[event];
        }
        return this.vm.data.get('_dispatched');
    }

    dispatchedByOrder() {
        if (!this.isSanInstance()) {
            throwError('wrapper.dispatchedByOrder() can only be called on a San instance');
        }

        return this.vm.data.get('_dispatchedByOrder');
    }

    exists() {
        if (this.vm) {
            return !this.vm.lifeCycle.detached;
        }
        return true;
    }

    filter() {
        throwError('filter() must be called on a WrapperArray');
    }

    find(selector) {
        const newSelector = getSelector(selector, 'find');
        const node = find(this.el, this.vm, newSelector)[0];

        if (!node) {
            if (newSelector.type === 'REF_SELECTOR') {
                return new ErrorWrapper(`ref="${newSelector.value.ref}"`);
            }
            return new ErrorWrapper(typeof newSelector.value === 'string' ? newSelector.value : 'Component');
        }
        return createWrapper(node, this.options);
    }

    findAll(selector) {
        const newSelector = getSelector(selector, 'findAll');
        const nodes = find(this.el, this.vm, newSelector);

        const wrappers = nodes.map(node => createWrapper(node, this.options));

        return new WrapperArray(wrappers);
    }

    fired(event) {
        if (!this.isSanInstance()) {
            throwError('wrapper.fired() can only be called on a San instance');
        }
        if (event) {
            return this.vm.data.get('_fired')[event];
        }
        return this.vm.data.get('_fired');
    }

    firedByOrder() {
        if (!this.isSanInstance()) {
            throwError('wrapper.firedByOrder() can only be called on a San instance');
        }

        return this.vm.data.get('_firedByOrder');
    }

    html() {
        return this.el.outerHTML;
    }

    htmlNoComment() {
        const html = this.html();
        return html.replace(/<!--[\w\W]*?-->/gi, '');
    }

    is(selector) {
        const newSelector = getSelector(selector, 'is');
        if (newSelector.type === 'DOM_SELECTOR') {
            return this.el && this.el.matches && this.el.matches(newSelector.value);
        }
        else if (newSelector.type === 'COMPONENT_SELECTOR') {
            const component = newSelector.value;
            return !this.vm
                ? false
                : this.vm.constructor === component
                    || (component.prototype.name && this.vm.name === component.prototype.name)
                    || (component.name && this.vm.name === component.name);
        }
        else if (newSelector.type === 'REF_SELECTOR') {
            throwError('$ref selectors can not be used with wrapper.is()');
        }
    }

    isEmpty() {
        return !([].slice.call(this.el.children).length);
    }

    isSanInstance() {
        return !!(this.vm && this.vm.nodeType === 5);
    }

    isVisible() {
        let el = this.el;
        while (el) {
            if (el.style && (el.style.visibility === 'hidden' || el.style.display === 'none')) {
                return false;
            }
            el = el.parentNode;
        }
        return true;
    }

    setChecked(checked) {
        const type = this.attributes('type');

        if (checked && typeof checked !== 'boolean') {
            throwError('wrapper.setChecked() must be passed a boolean');
        }

        if (type === 'checkbox') {
            this.el.checked = checked !== undefined
                ? !checked
                : this.el.checked;

            this.trigger('click');
        }
        else if (type === 'radio') {
            if (checked === false) {
                throwError('wrapper.setChecked() cannot be called with parameter false on a <input type="radio" /> element');
            }
            this.trigger('click');
        }
    }

    setData(data) {
        if (!this.isSanInstance()) {
            throwError('wrapper.setData() must be called on a San instance');
        }
        const originData = this.vm.data.get();
        const newData = mergeData(cloneDeep(originData), data);
        Object.keys(data).forEach(key => {
            this.vm.data.set(key, newData[key]);
        });
    }

    setMethods(methods) {
        if (!this.isSanInstance()) {
            throwError('wrapper.setMethods() can only be called on a San instance');
        }

        Object.keys(methods).forEach(method => {
            this.vm[method] = methods[method];
        });
    }

    setSelected() {
        const tagName = this.el.tagName;

        if (tagName === 'OPTION') {
            this.el.selected = true;

            let selectEl = this.el.parentNode;
            while (selectEl && selectEl.tagName !== 'SELECT') {
                selectEl = selectEl.parentNode;
            }

            if (selectEl) {
                createWrapper(selectEl, this.options).trigger('change');
            }
        }
        else {
            throwError('wrapper.setSelected() cannot be called on this element');
        }
    }

    setValue(value) {
        const tagName = this.el.tagName;

        if (tagName === 'OPTION') {
            throwError('wrapper.setValue() cannot be called on an <option> element. Use wrapper.setSelected() instead');
        }

        const type = this.attributes('type');
        if (type === 'radio') {
            throwError('wrapper.setValue() cannot be called on a <input type="radio" /> element. Use wrapper.setChecked() instead');
        }
        if (type === 'checkbox') {
            throwError('wrapper.setValue() cannot be called on a <input type="checkbox" /> element. Use wrapper.setChecked() instead');
        }

        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) {
            this.el.value = value;
            this.trigger(tagName === 'SELECT' ? 'change' : 'input');
        }
        else {
            throwError('wrapper.setValue() cannot be called on this element');
        }
    }

    text() {
        return this.el.textContent.trim();
    }

    trigger(type, options = {}) {
        if (typeof type !== 'string') {
            throwError('wrapper.trigger() must be passed a string');
        }
        if (options.target) {
            throwError('you cannot set the target value of an event');
        }
        const event = createDomEvent(type, options);
        this.el.dispatchEvent(event);
    }
}

export class SanWrapper extends Wrapper {
    constructor(vm, options) {
        super(vm, options, true);
        this.vm = vm;
        this.el = vm.el;
        this.options = options;
    }
}

export function createWrapper(vm, options) {
    return vm.aNode
        ? new SanWrapper(vm, options)
        : new Wrapper(vm, options);
}
