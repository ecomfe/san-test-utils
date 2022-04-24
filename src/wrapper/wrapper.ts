/**
 * @file san test utils wrapper file
 **/

import {Component} from 'san';
import {getSelector} from '../utils/validators';
import {throwError} from '../utils/index';
import isPlainObject from 'lodash/isPlainObject';
import cloneDeep from 'lodash/cloneDeep';
import find from './find';
import ErrorWrapper from './errorWrapper';
import createDomEvent from './createDomEvent';
import {VM, SelectorValue, WrapperElement, WrapperHTMLElement, LooseObject} from '../../types/index';

/* eslint-disable max-len */
function mergeData(originData: any, newData: LooseObject) {
    const keys = Object.keys(newData);
    for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        if (isPlainObject(newData[name]) && isPlainObject(originData[name])) {
            mergeData(originData[name], newData[name]);
        } else {
            originData[name] = newData[name];
        }
    }
    return {...originData};
}

export class WrapperArray {
    wrappers: Wrapper[];
    length: number;
    constructor(wrappers: Wrapper[]) {
        this.wrappers = wrappers;
        this.length = wrappers.length;
    }

    at(index: number) {
        if (!this.wrappers[index]) {
            throwError('no item exists at ' + index);
        }
        return this.wrappers[index];
    }

    contains(selector?: SelectorValue) {
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

    filter(fn: (value: Wrapper, index?: number, array?: Wrapper[]) => boolean) {
        return new WrapperArray(this.wrappers.filter(fn));
    }

    is(selector: SelectorValue) {
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

    setData(data: any) {
        this.throwErrorIfEmpty('setData');
        this.wrappers.forEach(wrapper => wrapper.setData(data));
    }

    setMethods(data: any) {
        this.throwErrorIfEmpty('setMethods');
        this.wrappers.forEach(wrapper => wrapper.setMethods(data));
    }

    setValue(data?: string) {
        this.throwErrorIfEmpty('setValue');
        this.wrappers.forEach(wrapper => wrapper.setValue(data));
    }

    trigger(type: any, options = {}) {
        this.throwErrorIfEmpty('trigger');
        this.wrappers.forEach(wrapper => wrapper.trigger(type, options));
    }

    throwErrorIfEmpty(msg: string) {
        if (this.wrappers.length === 0) {
            throwError(msg + ' cannot be called on 0 items');
        }
    }
}

export class Wrapper {
    el?: WrapperElement | WrapperHTMLElement;
    vm: null | VM<any> = null;
    options: object = {};
    constructor(node: Element | Component, options: object = {}, isSanWrapper?: boolean) {
        if (!isSanWrapper) {
            this.el = node instanceof Element ? node : node.el;
            this.vm = null;
            this.options = options;
        }
    }

    attributes(key: string) {
        const attributes = this.el!.attributes;
        let attributesMap: LooseObject = {};

        for (let i = 0; i < attributes.length; i++) {
            attributesMap[attributes.item(i)!.localName] = attributes.item(i)!.value;
        }
        return key ? attributesMap[key] : attributesMap;
    }

    classes(key?: string) {
        const classes = this.el!.classList;

        return key ? classes.contains(key) : [].slice.call(classes);
    }

    contains(selector?: SelectorValue) {
        const newSelector = getSelector(selector, 'contains');
        return !!find(this.el!, this.vm!, newSelector).length;
    }

    data(key?: string) {
        if (!this.isSanInstance()) {
            throwError('wrapper.data() must be called on a San instance');
        }
        const data = this.vm!.data.get();

        return key ? data[key] : data;
    }

    detach() {
        this.vm!.detach();
    }

    dispatched(event?: string) {
        if (!this.isSanInstance()) {
            throwError('wrapper.dispatched() can only be called on a San instance');
        }
        if (event) {
            return this.vm!.data.get('_dispatched')[event];
        }
        return this.vm!.data.get('_dispatched');
    }

    dispatchedByOrder() {
        if (!this.isSanInstance()) {
            throwError('wrapper.dispatchedByOrder() can only be called on a San instance');
        }

        return this.vm!.data.get('_dispatchedByOrder');
    }

    exists() {
        if (this.vm) {
            return !this.vm!.lifeCycle.detached;
        }
        return true;
    }

    filter() {
        throwError('filter() must be called on a WrapperArray');
    }

    find(selector: SelectorValue): SanWrapper | Wrapper | ErrorWrapper {
        const newSelector = getSelector(selector, 'find');
        const node = find(this.el!, this.vm!, newSelector)[0] as VM<any>;

        if (!node) {
            if (newSelector.type === 'REF_SELECTOR') {
                return new ErrorWrapper(`ref="${newSelector.value.ref}"`);
            }
            return new ErrorWrapper(typeof newSelector.value === 'string' ? newSelector.value : 'Component');
        }
        return createWrapper(node, this.options);
    }

    findAll(selector: SelectorValue): WrapperArray {
        const newSelector = getSelector(selector, 'findAll');
        const nodes = find(this.el!, this.vm!, newSelector) as VM<any>[];

        const wrappers = nodes.map(node => createWrapper(node, this.options));

        return new WrapperArray(wrappers);
    }

    fired(event?: string) {
        if (!this.isSanInstance()) {
            throwError('wrapper.fired() can only be called on a San instance');
        }
        if (event) {
            return this.vm!.data.get('_fired')[event];
        }
        return this.vm!.data.get('_fired');
    }

    firedByOrder() {
        if (!this.isSanInstance()) {
            throwError('wrapper.firedByOrder() can only be called on a San instance');
        }

        return this.vm!.data.get('_firedByOrder');
    }

    html() {
        return this.el!.outerHTML;
    }

    htmlNoComment() {
        const html = this.html();
        return html.replace(/<!--[\w\W]*?-->/gi, '');
    }

    is(selector: SelectorValue) {
        const newSelector = getSelector(selector, 'is');
        if (newSelector.type === 'DOM_SELECTOR') {
            return this.el && this.el.matches && this.el.matches(newSelector.value);
        } else if (newSelector.type === 'COMPONENT_SELECTOR') {
            const component = newSelector.value;
            return !this.vm
                ? false
                : this.vm.constructor === component ||
                    (component.prototype.name && this.vm.name === component.prototype.name) ||
                    (component.name && this.vm.name === component.name);
        } else if (newSelector.type === 'REF_SELECTOR') {
            throwError('$ref selectors can not be used with wrapper.is()');
        }
    }

    isEmpty() {
        return ![].slice.call(this.el!.children).length;
    }

    isSanInstance() {
        return !!(this.vm && this.vm.nodeType === 5);
    }

    isVisible() {
        let el = this.el as HTMLElement;
        while (el) {
            if (el.style && (el.style.visibility === 'hidden' || el.style.display === 'none')) {
                return false;
            }
            el = el.parentNode as HTMLElement;
        }
        return true;
    }

    setChecked(checked: boolean = true): void{
        const type = this.attributes('type');

        if (checked && typeof checked !== 'boolean') {
            throwError('wrapper.setChecked() must be passed a boolean');
        }

        if (type === 'checkbox') {
            this.el!.checked = !checked;

            this.trigger('click');
        } else if (type === 'radio') {
            if (checked === false) {
                throwError(
                    'wrapper.setChecked() cannot be called with parameter false on a <input type="radio" /> element'
                );
            }
            this.trigger('click');
        }
    }

    setData(data: object) {
        if (!this.isSanInstance()) {
            throwError('wrapper.setData() must be called on a San instance');
        }
        const originData = this.vm!.data.get();
        const newData = mergeData(cloneDeep(originData), data);
        Object.keys(data).forEach(key => {
            this.vm!.data.set(key, newData[key]);
        });
    }

    setMethods(methods: LooseObject) {
        if (!this.isSanInstance()) {
            throwError('wrapper.setMethods() can only be called on a San instance');
        }

        Object.keys(methods).forEach(method => {
            //@ts-ignore
            this.vm[method] = methods[method];
        });
    }

    setSelected() {
        const tagName = this.el!.tagName;

        if (tagName === 'OPTION') {
            this.el!.selected = true;

            let selectEl = this.el!.parentNode as WrapperHTMLElement;
            while (selectEl && selectEl.tagName !== 'SELECT') {
                selectEl = selectEl.parentNode as WrapperHTMLElement;
            }

            if (selectEl) {
                //@ts-ignore
                createWrapper(selectEl, this.options).trigger('change');
            }
        } else {
            throwError('wrapper.setSelected() cannot be called on this element');
        }
    }

    setValue(value?: string) {
        const tagName = this.el!.tagName;

        if (tagName === 'OPTION') {
            throwError('wrapper.setValue() cannot be called on an <option> element. Use wrapper.setSelected() instead');
        }

        const type = this.attributes('type');
        if (type === 'radio') {
            throwError(
                'wrapper.setValue() cannot be called on a <input type="radio" /> element. Use wrapper.setChecked() instead'
            );
        }
        if (type === 'checkbox') {
            throwError(
                'wrapper.setValue() cannot be called on a <input type="checkbox" /> element. Use wrapper.setChecked() instead'
            );
        }

        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)) {
            this.el!.value = value;
            this.trigger(tagName === 'SELECT' ? 'change' : 'input');
        } else {
            throwError('wrapper.setValue() cannot be called on this element');
        }
    }

    text() {
        return this.el!.textContent?.trim();
    }

    trigger(type: string, options?: LooseObject) {
        if (typeof type !== 'string') {
            throwError('wrapper.trigger() must be passed a string');
        }
        if (options && options.target) {
            throwError('you cannot set the target value of an event');
        }
        const event = createDomEvent(type, options);
        this.el!.dispatchEvent(event);
    }
}

export class SanWrapper extends Wrapper {
    constructor(vm: VM<any>, options: object) {
        super(vm, options, true);
        this.vm = vm;
        this.el = vm.el;
        this.options = options;
    }
}

export function createWrapper(vm: VM<any>, options: object): SanWrapper | Wrapper {
    return vm.aNode ? new SanWrapper(vm, options) : new Wrapper(vm, options, false);
}
