/**
 * @file define template property when extends a San component in ESNext.
 **/

import {Component} from 'san';
import component from './component';

export default class App extends Component {
    static template = `
        <div><component /></div>
    `

    static components = {
        component
    }
}
