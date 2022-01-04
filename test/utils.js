/**
 * @file san test utils test case util file
 **/

/* global describe */
import mount from '../src/attach';
import shallowMount from '../src/shallowAttach';
import renderToString from '../src/renderToString';

const shallowAndMount = [mount, shallowMount];
const shallowMountAndRender = [mount, shallowMount, renderToString];
const names = ['mount', 'shallowMount', 'renderToString'];

export function describeWithShallowAndMount(spec, cb) {
    shallowAndMount.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}

export function describeWithMountingMethods(spec, cb) {
    shallowMountAndRender.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}
