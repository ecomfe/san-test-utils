/**
 * @file San component with a method
 **/

import san from 'san';

export default san.defineComponent({
    someMethod() {
        console.log('some method');
    },
    template: '<div />'
});
