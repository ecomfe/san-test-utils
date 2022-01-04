/**
 * @file san test utils find san components file
 **/

import {ComponentWithPrototype, VM} from '../../types';

function findAllComponents(vm: ComponentWithPrototype, components: ComponentWithPrototype[] = []) {
    const vmComponents = vm.components;
    for (let key in vmComponents) {
        components.push(vmComponents[key]);
    }
    if (vm.children && vm.children.length) {
        vm.children.forEach((child: any) => {
            if (child.nodeType === 5) {
                findAllComponents(child, components);
            }
        });
    }
    return components;
}

export default function (vm: ComponentWithPrototype, component: ComponentWithPrototype) {
    const components = findAllComponents(vm);
    return components.filter(item => item === component);
}
