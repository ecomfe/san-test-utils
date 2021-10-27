/**
 * @file san test utils render to string file
 **/

import san, { SanComponent } from 'san';
import {throwError, mergeOptions, componentMap, versionCompare} from './utils/index';
import createComponent from './utils/createComponent';
import config from './config';
import {compileToRenderer} from 'san-ssr';
import { LooseObject, MergedComponentOptions } from './types';

export default function (component: SanComponent<any>, options: MergedComponentOptions | LooseObject = {}) {
    if (options.attachToDocument) {
        throwError('you cannot use attachToDocument with renderToString');
    }

    if (options.slots) {
        throwError('you cannot use slots with renderToString');
    }

    const mergedOptions = mergeOptions(options as MergedComponentOptions, config);

    let {newComponent, componentOptions} = createComponent(component, mergedOptions);

    newComponent = componentMap(newComponent, component => san.defineComponent(component))!;
    // @ts-ignore
    const renderer = versionCompare(san.version, '3.8.0') >= 0 ? compileToRenderer : san.compileToRenderer;

    return renderer(san.defineComponent(newComponent))(componentOptions.data || {});
}
