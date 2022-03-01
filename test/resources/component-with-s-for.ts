/**
 * @file San component with s-for directive
 **/

import san from 'san';
import component from './component';

export default san.defineComponent({
    components: {
        component
    },
    template: `<div>
        <component s-for="item in items" />
    </div>`
});
