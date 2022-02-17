/**
 * @file san test utils resource component
 **/

import san from 'san';

export default san.defineComponent({
    name: 'componentWithSlots',
    initData() {
        return {
            foo: 'bar'
        };
    },
    change() {
        this.data.set('foo', 'BAR');
    },
    template: `<div class="container" on-keydown="change">
        <header>
            <slot name="header" />
        </header>
        <main>
            <slot />
        </main>
        <footer>
            <slot name="footer" />
        </footer>
    </div>`
});
