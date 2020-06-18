/**
 * @file san test utils wrapper html test file
 **/

import {Component} from 'san';
import {describeWithShallowAndMount} from '../../utils';
import component from '../../resources/component';

/* global test */
describeWithShallowAndMount('html', (mount, methodName) => {
    test('returns a San Wrappers HTML as a string', () => {
        const expectedHtml = '<div></div>';
        const wrapper = mount(component);
        expect(wrapper.html()).toEqual(expectedHtml);
    });

    if (methodName !== 'shallowMount') {
        test('returns a San Wrappers HTML as a string', () => {
            const wrapper = mount({
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
        const wrapper = mount(componentAsAClass);
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

        const wrapper = mount({
            template: expectedHtml
        });
        expect(wrapper.html()).toEqual(expectedHtml);
    });
});
