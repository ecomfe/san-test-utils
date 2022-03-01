/**
 * @file extends a San component in ESNext.
 **/

import {Component} from 'san';
import componentWithChild from './component-with-child';

export default class ComponentAsAClass extends Component {

    static template = `
        <div><child-component /><slot /></div>
    `

    static components = {
        'child-component': componentWithChild
    }
}
