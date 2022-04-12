/**
 * @file san test utils render to string file
 **/

import renderToString from './renderToString';
import cheerio from 'cheerio';
import { Component } from 'san/types';

export default function (component: Component<any>, options = {}) {
    const str = renderToString(component, options);

    return cheerio.load('')(str);
}
