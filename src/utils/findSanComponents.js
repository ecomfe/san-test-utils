/**
 * @file san test utils find san components file
 **/

function findAllComponents(vm, components = []) {
    const vmComponents = vm.components;
    for (let key in vmComponents) {
        components.push(vmComponents[key]);
    }
    if (vm.children && vm.children.length) {
        vm.children.forEach(child => {
            if (child.nodeType === 5) {
                findAllComponents(child, components);
            }
        });
    }
    return components;
}

export default function (vm, component) {
    const components = findAllComponents(vm);
    return components.filter(item => item === component);
}
