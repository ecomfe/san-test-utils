/**
 * @file san test utils tool file
 **/

import san, {ANode, ANodeProperty, SanComponent, SanComponentConfig} from 'san';
import isPlainObject from 'lodash/isPlainObject';
import {throwError, templateContainsComponent} from './index';
import config from '../config';
import {BasicOptions, ComponentWithPrototype, LooseObject} from '../types';

function getAllSlot(source: ANode, slots: ANode[] = []) {
    if (source.tagName === 'slot') {
        slots.push(source);
    }
    const children = source.children || [];
    children.forEach(child => {
        getAllSlot(child, slots);
    });

    return slots;
}

function getComponentProps(source: ANode, tagName: string) {
    let props;
    if (source.tagName === tagName) {
        return source.props;
    }
    const children = source.children || [];
    children.forEach(child => {
        props = getComponentProps(child, tagName);
    });

    return props;
}

function createBlankStub(originalComponent: SanComponentConfig<any, any>, name: string, props: ANodeProperty[] = []) {
    const template =
        originalComponent.template ||
        // @ts-ignore
        (originalComponent.prototype && originalComponent.prototype.template);
    const source = san.parseTemplate(template);
    const slots = getAllSlot(source);
    let slotTemplate = '';
    let propsTemplate = '';

    if (props.length) {
        props.forEach(prop => {
            propsTemplate += `${prop.name}="${prop.raw}" `;
        });
    }

    if (slots.length) {
        slots.forEach(slot => {
            const slotName = slot.props.filter(slot => slot.name === 'name');
            slotTemplate += slotName.length ? `<slot name="${slotName[0].raw}" />` : '<slot />';
        });
    } else {
        slotTemplate = '<slot />';
    }
    return {
        template: `<${name}-stub ${propsTemplate}>${slotTemplate}</${name}-stub>`
    };
}

export function isValidStub(stub: BasicOptions) {
    return (
        (!!stub && typeof stub === 'string') ||
        stub === true ||
        (stub && stub.template) ||
        (typeof stub === 'function' && stub.name === 'ComponentClass')
    );
}

export function createComponentStubs(originalComponents: LooseObject = {}, stubs: BasicOptions[]) {
    const components: LooseObject = {};

    if (!stubs) {
        return components;
    }

    if (Array.isArray(stubs)) {
        stubs.forEach(stub => {
            if (typeof stub === 'string') {
                if (!config.stubs[stub]) {
                    components[stub] = createBlankStub({}, stub);
                } else {
                    components[stub] = {
                        template: config.stubs[stub]
                    };
                }
            } else {
                throwError('each item in an options.stubs array must be a string');
            }
        });
    } else {
        Object.keys(stubs).forEach(stub => {
            if (stubs[stub] === false) {
                return;
            }

            if (!isValidStub(stubs[stub])) {
                throwError('options.stub values must be passed a string or component');
            }

            if (stubs[stub] === true) {
                components[stub] = createBlankStub({}, stub);
                return;
            }

            if (typeof stubs[stub] === 'string') {
                if (templateContainsComponent(stubs[stub], stub)) {
                    throwError('options.stub cannot contain a circular reference');
                }
                components[stub] = {
                    template: stubs[stub]
                };
                originalComponents[stub] && (components[stub].name = originalComponents[stub].name);
            } else {
                components[stub] = stubs[stub];
                originalComponents[stub] && (components[stub].prototype.name = originalComponents[stub].name);
            }
        });
    }

    return components;
}

export function createAllStubComponents(component: ComponentWithPrototype) {
    const stubbedComponents: LooseObject = {};
    const components = component.components || (component.prototype && component.prototype.components) || {};

    const template = component.template || (component.prototype && component.prototype.template);

    const source = san.parseTemplate(template);
    const initData = component.initData || (component.prototype && component.prototype.initData);

    Object.keys(components).forEach(key => {
        const props = getComponentProps(source, key);
        stubbedComponents[key] = createBlankStub(components[key], key, props);
        const comp = components[key];

        let name;
        if (typeof comp === 'function') {
            name = comp.name === 'ComponentClass' ? comp.prototype.name : comp.name;
        } else if (isPlainObject(comp)) {
            name = comp.name;
        }

        name && (stubbedComponents[key].name = name);
        initData && (stubbedComponents[key].initData = initData);
    });
    return stubbedComponents;
}
