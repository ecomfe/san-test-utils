/**
 * @file san test utils resource component
 **/

import {Component} from 'san';
import component from './component';

export default class App extends Component {
    static name = 'componentasaclasswithchild'

    static template = `
        <div><component /></div>
    `

    static components = {
        component
    }
}
