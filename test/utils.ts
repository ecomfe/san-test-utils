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

export function describeWithShallowAndAttach(
    spec: string,
    cb: (method: typeof attach | typeof shallowAttach, name: string) => void
) {
    shallowAndAttach.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}

export function describeWithAttachingMethods(
    spec: string,
    cb: (method: typeof attach | typeof shallowAttach, name: string) => void
) {
    shallowAttachAndRender.forEach((method, i) => {
        const name = names[i];
        describe(`${spec} with ${name}`, () => cb(method, name));
    });
}
