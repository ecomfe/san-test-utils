/**
 * @file san test utils find san components file
 **/

import {ComponentDefineOptions} from 'san/types';

function findAllComponents(vm: ComponentDefineOptions, components: ComponentDefineOptions[] = []) {
    const vmComponents = vm.components as ComponentDefineOptions;
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

export default function (vm: ComponentDefineOptions, component: ComponentDefineOptions) {
    const components = findAllComponents(vm);
    return components.filter(item => item === component);
}
