/**
 * @file click component
 **/

import san from 'san';
import axios from 'axios';

export default san.defineComponent({
    initData() {
        return {
            value: null
        };
    },
    fetchResults() {
        axios.get('mock/service').then(response => {
            this.data.set('value', response.data);
        });
    },
    template: `<div>
        <button on-click="fetchResults">go</button>
    </div>`
});
