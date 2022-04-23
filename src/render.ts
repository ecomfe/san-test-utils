/**
 * @file san test utils render to string file
 **/

import renderToString from './renderToString';
import cheerio from 'cheerio';
import { Component } from 'san';

export default function (component: Component<{}>, options = {}) {
    const str = renderToString(component, options);

    return cheerio.load('')(str);
}
