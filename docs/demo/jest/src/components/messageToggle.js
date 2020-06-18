/**
 * @file jest demo file
 **/
import san from 'san';
import message from '@/components/message';

export default san.defineComponent({
    initData() {
        return {
            msg: null
        };
    },
    components: {
        message
    },
    toggleMessage() {
        const msg = this.data.get('msg');
        this.data.set('msg', msg === 'message' ? 'toggled message' : 'message');
    },
    template: `<div>
        <message msg="{{msg}}" />
        <button id="toggle-message" on-click="toggleMessage">
            Change message
        </button>
    </div>`
});
