/**
 * @file san test utils wrapper html test file
 **/

import {Component} from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import component from '../../resources/component';

/* global test */
describeWithShallowAndAttach('html', (attach, methodName) => {
    test('returns a San Wrappers HTML as a string', () => {
        const expectedHtml = '<div></div>';
        const wrapper = attach(component);
        expect(wrapper.html()).toEqual(expectedHtml);
    });

    if (methodName !== 'shallowAttach') {
        test('returns a San Wrappers HTML as a string', () => {
            const wrapper = attach({
                template: '<div>1<tester /></div>',
                components: {
                    tester: {
                        template: '<div class="tester">test</div>'
                    }
                }
            });
            const expectedHtml = '<div>1<div class="tester">test</div></div>';
            expect(wrapper.html()).toEqual(expectedHtml);
        });
    }

    test('handles class component', () => {
        class componentAsAClass extends Component {
            static template = '<div />'
        }
        const wrapper = attach(componentAsAClass);
        expect(wrapper.html()).toEqual('<div></div>');
    });

    test('returns a Wrappers HTML as a pretty printed string', () => {
        const expectedHtml = '<body>\n'
            + '  <div>\n'
            + '    <ul>\n'
            + '      <li></li>\n'
            + '      <li></li>\n'
            + '    </ul>\n'
            + '  </div>\n'
            + '</body>';

        const wrapper = attach({
            template: expectedHtml
        });
        expect(wrapper.html()).toEqual(expectedHtml);
    });
});
