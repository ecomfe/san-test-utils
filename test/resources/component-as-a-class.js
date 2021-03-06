/**
 * @file san test utils resource component
 **/

import {Component} from 'san';
import componentWithChild from './component-with-child';

export default class App extends Component {
    static name = 'componentasaclass'

    static template = `
        <div><child-component /><slot /></div>
    `

    static components = {
        'child-component': componentWithChild
    }
}
