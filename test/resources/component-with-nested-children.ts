/**
 * @file San component with nested child components
 **/

import san from 'san';
import componentWithChild from './component-with-child';
import componentWithLifecycleHooks from './component-with-lifecycle-hooks';

export default san.defineComponent({
    components: {
        'child-component': componentWithChild,
        'component-with-lifecycle-hooks': componentWithLifecycleHooks
    },
    template: `<div>
        <span><child-component /><component-with-lifecycle-hooks /></span>
    </div>`
});
