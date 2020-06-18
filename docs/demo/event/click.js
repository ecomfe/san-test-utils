/**
 * @file click component
 **/

import san from 'san';

export default san.defineComponent({
    callYes() {
        this.callMe('yes');
    },
    callNo() {
        this.callMe('no');
    },
    template: `<div>
        <button class="yes" on-click="callYes">Yes</button>
        <button class="no" on-click="callNo">No</button>
    </div>`
});
