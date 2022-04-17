/**
 * @file San component with a slot
 **/

import san from 'san';

export default san.defineComponent({
    template: `<div>
        <slot />
    </div>`
});
