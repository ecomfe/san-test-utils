/**
 * @file san test utils resource component
 **/

import san from 'san';

export default san.defineComponent({
    compiled() {
        console.info('compiled');
    },
    inited() {
        console.info('inited');
    },
    created() {
        console.info('created');
    },
    attached() {
        console.info('attached');
    },
    updated() {
        console.info('updated');
    },
    detached() {
        console.info('detached');
    },
    disposed() {
        console.info('disposed');
    },
    template: '<div />'
});
