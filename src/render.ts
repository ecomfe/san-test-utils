/**
 * @file san test utils render to string file
 **/

import renderToString from './renderToString';
import cheerio from 'cheerio';
import { SanComponent } from 'san/types';

export default function (component: SanComponent<any>, options = {}) {
    const str = renderToString(component, options);

    return cheerio.load('')(str);
}
