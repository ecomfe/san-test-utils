/**
 * @file san test utils resource component
 **/

import san from 'san';
import component from './component';

export default san.defineComponent({
    name: 'componentWithChild',
    components: {
        'child-component': component
    },
    template: `<div>
        <span><child-component s-ref="child" /></span>
    </div>`
});
