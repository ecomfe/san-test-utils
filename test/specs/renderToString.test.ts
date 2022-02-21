/**
 * @file san test utils render to string file
 **/

import san from 'san';
import renderToString from '../../src/renderToString';
import componentWithChild from '../resources/component-with-child';

/* global test */
describe('render to string', () => {
    test('returns a string', () => {
        const str = renderToString({
            template: '<div>{{val}}</div>',
            initData() {
                return {
                    val: '123'
                };
            }
        });

        expect(str).toContain('123');
    });

    test('adds variables to vm when passed', () => {
        const testComponent = {
            template: `<div>
                {{store}}
                {{path}}
            </div>`
        };
        const store = true;
        const path = 'http://test.com';
        const str = renderToString(testComponent, {
            data: {
                store,
                path
            }
        });
        expect(str).toContain('true');
        expect(str).toContain('http://test.com');
    });

    test('replaces component with template string ', () => {
        const str = renderToString(componentWithChild, {
            stubs: {
                'child-component': '<div class="stub"></div>'
            }
        });

        expect(str).toContain('"stub"');
    });
});
