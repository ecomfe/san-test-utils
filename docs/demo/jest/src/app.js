/**
 * @file jest demo file
 **/
import san from 'san';
import list from '@/components/list';
import messageToggle from '@/components/messageToggle';

export default san.defineComponent({
    initData() {
        return {
            items: ['list item 1', 'list item 2']
        };
    },
    components: {
        'list': list,
        'message-toggle': messageToggle
    },
    template: `<div id="app">
        <message-toggle />
        <list items="{{items}}" />
    </div>`
});
