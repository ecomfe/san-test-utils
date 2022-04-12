/**
 * @file San component with watch API
 **/

import san from 'san';

export default san.defineComponent({
    initData() {
        return {
            data1: 'default data1',
            data2: 'default data2'
        };
    },
    inited() {
        this.watch('data1', val => {
            this.data.set('data2', val);
        });

        this.watch('data2', val => {
            console.info(this.data.get('data1'));
        });
    },
    template: `<div>
        {{data1}}
        {{data2}}
    </div>`
});
