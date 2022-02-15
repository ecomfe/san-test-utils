/**
 * @file san test utils tool file
 **/

import san, {AElement, ComponentDefineOptions} from 'san';
import isPlainObject from 'lodash/isPlainObject';
import {throwError, templateContainsComponent} from './index';
import config from '../config';
import {NewAProperty, BasicOptions, LooseObject} from '../../types';

function getAllSlot(source: AElement, slots: AElement[] = []) {
    if (source.tagName === 'slot') {
        slots.push(source);
    }
    const children = source.children ? (source.children as AElement[]) : ([] as AElement[]);
    children.forEach(child => {
        getAllSlot(child, slots);
    });

    return slots;
}

function getComponentProps(source: AElement, tagName: string) {
    let props;
    if (source.tagName === tagName) {
        return source.props;
    }
    const children = source.children ? (source.children as AElement[]) : ([] as AElement[]);
    children.forEach(child => {
        props = getComponentProps(child, tagName);
    });

    return props;
}

function createBlankStub(originalComponent: ComponentDefineOptions, name: string, props: NewAProperty[] = []) {
    const template =
        originalComponent.template ||
        // @ts-ignore
        (originalComponent.prototype && originalComponent.prototype.template);
    const source = san.parseTemplate(template) as AElement;
    const slots = getAllSlot(source);
    let slotTemplate = '';
    let propsTemplate = '';
    function addDelimiters(source: string, delimiters: [string, string] = ['{{', '}}']) {
        return delimiters[0] + source + delimiters[1];
    }
    if (props.length) {
        props.forEach(prop => {
            let rawValue = prop.expr.value || '';
            if (prop.expr.type === 4 && prop.expr.paths.length) {
                if (prop.expr.paths[0].type === 1) {
                    rawValue =
                        prop.x === 1
                            ? addDelimiters(prop.expr.paths[0].value, ['{=', '=}'])
                            : addDelimiters(prop.expr.paths[0].value);
                }
            }
            propsTemplate += `${prop.name}="${rawValue}" `;
        });
    }

    if (slots.length) {
        slots.forEach(slot => {
            const slotName = slot.props.filter(slot => slot.name === 'name') as NewAProperty[];
            slotTemplate += slotName.length ? `<slot name="${slotName[0].expr.value}" />` : '<slot />';
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

export function createAllStubComponents(component: ComponentDefineOptions) {
    const stubbedComponents: LooseObject = {};
    const components = component.components || (component.prototype && component.prototype.components) || {};

    const template = component.template || (component.prototype && component.prototype.template);

    const source = san.parseTemplate(template) as AElement;
    const initData = component.initData || (component.prototype && component.prototype.initData);

    Object.keys(components).forEach(key => {
        const props = getComponentProps(source, key) as NewAProperty[];

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
