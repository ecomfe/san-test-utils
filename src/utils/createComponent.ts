/**
 * @file san test utils tool file
 **/

import {ComponentNewOptions} from 'san';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import {throwError, genId, componentMap, getComponentProto} from './index';
import {createComponentStubs} from './createComponentStubs';
import {LooseObject, SlotObject} from '../../types';
import {ComponentDefineOptionComponents, Component, ComponentDefineOptions} from 'san/types';

function mergeStubsComponents(rootComponent: ComponentDefineOptions, stubsComponents: LooseObject) {
    if (isEmpty(rootComponent.components)) {
        rootComponent.components = stubsComponents;
    }
    rootComponent = componentMap(rootComponent, (component, name = '') => {
        if (stubsComponents[name]) {
            component = stubsComponents[name];
        }
        return component;
    })!;
    return rootComponent;
}

function getSlotObject(key: string, value: string | Function | object) {
    const result: SlotObject = {};
    let template;
    if (typeof value === 'function' || isPlainObject(value)) {
        result.slotId = genId();
        result.type = 'component';
        result.component = value;
        template = `<${result.slotId} />`;
    } else if (typeof value === 'string') {
        result.type = 'string';
        template = value;
    }
    result.template = `<template ${key === 'default' ? '' : 'slot="' + key + '"'}>${template}</template>`;
    return result;
}

export function getNewComponent(component: ComponentDefineOptions) {
    if (isPlainObject(component)) {
        const clonedComponent = cloneDeep(component);
        for (let key in clonedComponent.components) {
            clonedComponent.components[key] = getComponentProto(
                clonedComponent.components[key] as ComponentDefineOptionComponents
            );
        }
        return clonedComponent;
    }
    return getComponentProto(component);
}

export default function (component: ComponentDefineOptions | LooseObject, options: LooseObject = {}) {
    let newComponent = getNewComponent(component);

    const componentOptions: ComponentNewOptions = {
        data: options.data || {}
    };

    // process methods
    const methods = options.methods || {};
    Object.keys(methods).forEach(key => {
        if (typeof methods[key] === 'function') {
            newComponent[key] = methods[key];
        }
    });

    // process parent component
    let parentComponent = options.parentComponent;
    if (parentComponent) {
        if (
            !isPlainObject(parentComponent) &&
            (typeof parentComponent !== 'function' || parentComponent.name !== 'ComponentClass')
        ) {
            throwError('options.parentComponent should be a valid San component');
        }
        componentOptions.owner = parentComponent;
    }

    // process stubs
    let stubsComponents = {};
    if (Object.keys(options.stubs).length > 0) {
        const components = newComponent.components || {};
        stubsComponents = {
            ...options.components,
            ...createComponentStubs(components, options.stubs)
        };
    }
    newComponent = mergeStubsComponents(newComponent, stubsComponents);

    const slots = options.slots;
    if (slots) {
        const slotsArr: SlotObject[] = [];
        Object.keys(slots).forEach(key => {
            const slotItems = Array.isArray(slots[key]) ? slots[key] : [slots[key]];
            slotItems.forEach((slot: Function | string | object) => {
                if (typeof slot !== 'string' && !isPlainObject(slot) && typeof slot !== 'function') {
                    throwError('slots[key] must be a Component, string or an array of Components');
                }
                slotsArr.push(getSlotObject(key, slot));
            });
        });
        let slotTemplate = '';
        slotsArr.forEach(slot => {
            if (slot.type === 'component') {
                newComponent.components[slot.slotId!] = getComponentProto(slot.component as object);
            }
            slotTemplate += slot.template;
        });

        componentOptions.source = `<slots-component>${slotTemplate}</slots-component>`;
        componentOptions.owner = newComponent as Component;
    }

    return {
        newComponent: newComponent,
        componentOptions
    };
}
