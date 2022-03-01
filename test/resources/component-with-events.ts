/**
 * @file San component with DOM events
 **/

import san from 'san';

export default san.defineComponent({
    initData() {
        return {
            isActive: false
        };
    },
    clickHandler() {
    },
    keyupHandler() {
    },
    keydownHandler() {
    },
    mousedownHandler(e) {
        if (e.button === 0) {
            this.clickHandler();
            console.info(e.defaultPrevented);
        }
    },
    toggleActive() {
        this.data.set('isActive', !this.data.get('isActive'));
    },
    template: `<div>
        <button class="click" on-click="clickHandler" id="button" />
        <button class="left-click" on-mousedown="mousedownHandler" />
        <div on-click="toggleActive" class="toggle {{isActive ? 'active' : ''}}" />
        <input
            class="keydown"
            type="text"
            on-keyup="keyupHandler"
            on-keydown="keydownHandler"
        />
        <input class="keydown-enter" type="text" on-keydown-enter="keydownHandler" />
    </div>`
});
