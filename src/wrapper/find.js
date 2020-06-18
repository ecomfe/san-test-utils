/**
 * @file san test utils wrapper find file
 **/

import {throwError} from '../utils/index';

export function findAllComponents(vm, components = []) {
    components.push(vm);
    if (vm && vm.children && vm.children.length) {
        vm.children.forEach(child => {
            if ([2, 3, 4, 5, 6, 7].includes(child.nodeType)) {
                findAllComponents(child, components);
            }
        });
    }
    return components;
}

export function findSanComponent(vm, component) {
    const components = findAllComponents(vm);
    return components.filter(
        item => item.constructor === component
        || (component.prototype.name && item.name === component.prototype.name)
        || (component.componentName && item.componentName === component.componentName)
        || (component.name && item.name === component.name)
    );
}

export function findDomNodes(root, selector) {
    const nodes = [];
    if (!root || !root.querySelectorAll || !root.matches) {
        return nodes;
    }

    if (root.matches(selector)) {
        nodes.push(root);
    }

    return nodes.concat([].slice.call(root.querySelectorAll(selector)));
}

export default function (el, vm, selector) {
    if (!vm && selector.type === 'COMPONENT_SELECTOR') {
        throwError('cannot find a San instance on a DOM node');
    }

    if ((!vm || vm && vm.nodeType !== 5) && selector.type === 'REF_SELECTOR') {
        throwError('$ref selectors can only be used on San component wrappers');
    }

    if (el instanceof Element && selector.type === 'DOM_SELECTOR') {
        let domComponents = [];
        if (vm && vm.children.length) {
            domComponents = findAllComponents(vm).filter(component => {
                return component.el && findDomNodes(el, selector.value).includes(component.el);
            });
        }
        return domComponents.length ? domComponents : findDomNodes(el, selector.value);
    }

    if (vm && vm.ref && selector.type === 'REF_SELECTOR') {
        const ref = vm.ref(selector.value.ref);
        return ref ? [ref] : [];
    }

    return findSanComponent(vm, selector.value);
}
