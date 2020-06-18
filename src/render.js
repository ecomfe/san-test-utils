/**
 * @file san test utils render to string file
 **/

import renderToString from './renderToString';
import cheerio from 'cheerio';

export default function (component, options = {}) {
    const str = renderToString(component, options);

    return cheerio.load('')(str);
}
