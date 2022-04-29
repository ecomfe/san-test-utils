/**
 * @file extends a Base component which extends san.Component.
 **/

import {Component} from 'san';

class Base extends Component {
    customMethod() {
        return 'newContent';
    }
}

export default class ComponentExtendsBase extends Base {

    static template = `
        <div>
            <span>{{customContent}}</span>
            <button on-click="handleClick">button</button>
        </div>
    `;

    initData() {
        return {
            customContent: 'customContent'
        };
    }

    handleClick() {
        const newContent = this.customMethod();
        this.data.set('customContent', newContent);
    }

}
