/**
 * @file san test utils wrapper find file
 **/
import {VM, Selector, SelectorValue} from '../../types';
import {throwError} from '../utils/index';

export function findAllComponents(vm: VM<any>, components: Array<VM<any>> = []) {
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

export function findSanComponent(vm: VM<any>, component: any) {
    const components = findAllComponents(vm);
    return components.filter(
        item =>
            item.constructor === component ||
            (component.prototype.name && item.name === component.prototype.name) ||
            (component.componentName && item.componentName === component.componentName) ||
            (component.name && item.name === component.name)
    );
}

export function findDomNodes(root: Element, selector: SelectorValue) {
    const nodes: Element[] = [];
    if (!root || !root.querySelectorAll || !root.matches) {
        return nodes;
    }

    if (typeof selector === 'string' && root.matches(selector)) {
        nodes.push(root);
    }

    return nodes.concat([].slice.call(root.querySelectorAll(selector as any)));
}

export default function (el: Element, vm: VM<any>, selector: Selector) {
    if (!vm && selector.type === 'COMPONENT_SELECTOR') {
        throwError('cannot find a San instance on a DOM node');
    }

    if ((!vm || (vm && vm.nodeType !== 5)) && selector.type === 'REF_SELECTOR') {
        throwError('$ref selectors can only be used on San component wrappers');
    }

    if (el instanceof Element && selector.type === 'DOM_SELECTOR') {
        let domComponents: VM<any>[] = [];
        if (vm && vm.children.length) {
            domComponents = findAllComponents(vm).filter(component => {
                return component.el && findDomNodes(el, selector.value).includes(component.el);
            });
        }
        return domComponents.length ? domComponents : findDomNodes(el, selector.value);
    }

    // @ts-ignore
    if (vm && vm.ref && selector.type === 'REF_SELECTOR' && typeof selector.value !== 'string') {
        const ref = 'ref' in selector.value ? vm.ref(selector.value.ref) : undefined;
        return ref ? [ref] : [];
    }

    return findSanComponent(vm, selector.value);
}
