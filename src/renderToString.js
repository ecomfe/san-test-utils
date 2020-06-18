/**
 * @file san test utils render to string file
 **/

import san from 'san';
import {throwError, mergeOptions, componentMap, versionCompare} from './utils/index';
import createComponent from './utils/createComponent';
import config from './config';
import {compileToRenderer} from 'san-ssr';

export default function (component, options = {}) {
    if (options.attachToDocument) {
        throwError('you cannot use attachToDocument with renderToString');
    }

    if (options.slots) {
        throwError('you cannot use slots with renderToString');
    }

    const mergedOptions = mergeOptions(options, config);

    let {newComponent, componentOptions} = createComponent(component, mergedOptions);

    newComponent = componentMap(newComponent, component => san.defineComponent(component));

    const renderer = versionCompare(san.version, '3.8.0') >= 0 ? compileToRenderer : san.compileToRenderer;

    return renderer(san.defineComponent(newComponent))(componentOptions.data || {});
}
