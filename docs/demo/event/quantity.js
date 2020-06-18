import san from 'san';

const KEY_DOWN = 40;
const KEY_UP = 38;
const ESCAPE = 27;

export default san.defineComponent({
    initData() {
        return {
            quantity: 0
        };
    },
    inited() {
        this.watch('quantity', val => {
            this.fire('input', val);
        });
    },
    increment() {
        let quantity = this.data.get('quantity');
        this.data.set('quantity', ++quantity);
    },
    decrement() {
        let quantity = this.data.get('quantity');
        this.data.set('quantity', --quantity);
    },
    clear() {
        this.data.set('quantity', 0);
    },
    onKeydown(e) {
        if (e.keyCode === ESCAPE) {
            this.clear();
        }
        if (e.keyCode === KEY_DOWN) {
            this.decrement();
        }
        if (e.keyCode === KEY_UP) {
            this.increment();
        }
        if (e.key === 'a') {
            this.data.set('quantity', 13);
        }
    },
    template: '<input type="text" on-keydown="onKeydown" value="{=quantity=}" />'
});

