/**
 * @file san test utils tool file
 **/

function getOption(name, options, config = {}) {
    if (options
        || (config[name] && Object.keys(config[name]).length > 0)) {
        if (options instanceof Function) {
            return options;
        }
        else if (Array.isArray(options)) {
            return [
                ...options,
                ...Object.keys(config[name] || {})
            ];
        }
        else if (!(config[name] instanceof Function)) {
            return {
                ...config[name],
                ...options
            };
        }
        throwError('Config can\'t be a Function.');
    }
    return {};
}

export function genId() {
    const url = 'modulesymbhasownprabcdefghijklmnopqrstuvwxyza';
    let size = 10;
    let id = '';
    while (size--) {
        id += url[Math.random() * 45 | 0];
    }
    return id;
}

export function throwError(msg) {
    throw new Error(`[san-test-utils]: ${msg}`);
}

export function mergeOptions(options, config) {
    return {
        ...options,
        stubs: getOption('stubs', options.stubs, config),
        data: getOption('data', options.data, config),
        methods: getOption('methods', options.methods, config)
    };
}

export function templateContainsComponent(template, name) {
    const re = new RegExp(`<${name}\\s*(\\s|>|(\/>))`, 'g');
    return re.test(template);
}

export function getComponentProto(rootComponent, results = {}) {
    const names = Object.getOwnPropertyNames(rootComponent && rootComponent.prototype || {});
    names.forEach(name => {
        if (name !== 'constructor') {
            results[name] = rootComponent.prototype[name];
        }
    });

    const staticProto = Object.keys(rootComponent);
    if (staticProto.length) {
        staticProto.forEach(key => {
            results[key] = rootComponent[key];
        });
    }
    delete results.constructor;
    const components = {
        ...results.components
    };
    results.components = {};
    Object.keys(components).forEach(component => {
        results.components[component] = getComponentProto(components[component]);
    });
    return results;
}


export function componentMap(component, callback = component => component) {
    if (!component) {
        return;
    }
    const components = Object.assign({}, component.components || component.prototype && component.prototype.components);
    let newComponent;
    if (typeof component === 'function') {
        newComponent = getComponentProto(component);
    }
    else {
        newComponent = Object.assign({}, component);
    }
    newComponent.components = {};
    Object.keys(components).forEach(key => {
        newComponent.components[key] = callback(componentMap(components[key], callback), key);
    });

    return newComponent;
}


export function getAllComponents(rootComponent, components = {}) {
    const comps = rootComponent.prototype.components || {};
    Object.keys(comps).forEach(key => {
        components[key] = comps[key];
        getAllComponents(comps[key], components);
    });
    return components;
}

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

export function versionCompare(version1, version2) {
    const version1Arr = version1.split('.');
    const version2Arr = version2.split('.');
    let i = 0;
    let diff = 0;

    diff = version1Arr.length - version2Arr.length;
    while (diff === 0 && i < version1Arr.length) {
        diff = Number(version1Arr[i] - Number(version2Arr[i]));
        ++i;
    }
    if (diff > 0) {
        return 1;
    }
    else if (diff < 0) {
        return -1;
    }
    return 0;
}
