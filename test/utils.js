/**
 * @file san test utils test case util file
 **/

/* global describe */
import attach from '../src/attach';
import shallowAttach from '../src/shallowAttach';
import renderToString from '../src/renderToString';

const shallowAndAttach = [attach, shallowAttach];
const shallowAttachAndRender = [attach, shallowAttach, renderToString];
const names = ['attach', 'shallowAttach', 'renderToString'];

export function describeWithShallowAndAttach(spec, cb) {
    shallowAndAttach.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}

export function describeWithAttachingMethods(spec, cb) {
    shallowAttachAndRender.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}
