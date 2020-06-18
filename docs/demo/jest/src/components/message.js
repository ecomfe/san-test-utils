/**
 * @file jest demo file
 **/
import san from 'san';

export default san.defineComponent({
    name: 'message',
    template: `
        <h1>{{msg || 'default message'}}</h1>
    `
});
