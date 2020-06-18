/**
 * @file san test utils render to string file
 **/

import render from '../../src/render';
import cheerio from 'cheerio';

/* global test */
describe('render', () => {
    test('returns a cheerio wrapper of the rendered component', () => {
        const testComponent = {
            template: '<div><h2>Test</h2><p></p><p></p></div>'
        };
        const wrapper = render(testComponent);
        expect(wrapper).toBeInstanceOf(cheerio);
        expect(wrapper.find('h2').text()).toEqual('Test');
        expect(wrapper.find('p').length).toEqual(2);
    });
});
