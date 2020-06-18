/**
 * @file san test utils resource component
 **/

import san from 'san';

export default san.defineComponent({
    name: 'ifcomponent',
    initData() {
        return {
            ready: false,
            rootReady: true
        };
    },
    template: `<div>
        <div s-if="rootReady">
            <div s-if="!ready" class="not-ready"><div /></div>
            <div s-else class="parent ready"><div class="child ready" /></div>
        </div>
    </div>`
});
