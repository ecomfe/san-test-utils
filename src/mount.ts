/**
 * @file san test utils mount file
 **/

import san from 'san';
import {throwError, mergeOptions} from './utils/index';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import {createWrapper} from './wrapper/wrapper';
import {addEventLogger} from './utils/logEvents';
import config from './config';
import createComponent from './utils/createComponent';
import { ComponentWithPrototype, LooseObject, MergedComponentOptions, VM } from './types';

export default function (component: ComponentWithPrototype, options: MergedComponentOptions | LooseObject = {}) {
    if (!isPlainObject(component) && !isFunction(component)) {
        throwError('component must be plain Object or san component.');
    }

    addEventLogger(san);

    const mergedOptions = mergeOptions(options as MergedComponentOptions, config);

    const {newComponent, componentOptions} = createComponent(component, mergedOptions);
    if (componentOptions.owner) {
        componentOptions.owner = new (san.defineComponent(componentOptions.owner))();
    }
    const Component = san.defineComponent(newComponent);
    const vm = new Component(componentOptions) as VM<any>;

    if (document && mergedOptions.attachToDocument) {
        vm.attach(document.body);
    }
    else {
        //@ts-ignore
        vm.attach();
    }

    return createWrapper(vm, {});
}
