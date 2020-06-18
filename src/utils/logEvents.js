/**
 * @file san test utils log events file
 **/

export function addEventLogger(localSan) {
    localSan.Component.prototype.fire = function (name, ...args) {
        const fired = this.data.get('_fired') || {};
        const firedByOrder = this.data.get('_firedByOrder') || [];
        (fired[name] || (fired[name] = [])).push(args);
        firedByOrder.push({name, args});
        this.data.set('_fired', fired);
        this.data.set('_firedByOrder', firedByOrder);

        const listeners = this.listeners[name] || [];
        listeners.forEach(listener => {
            listener.fn.call(this, ...args);
        });
    };


    localSan.Component.prototype.dispatch = function (name, args) {
        const dispatched = this.data.get('_dispatched') || {};
        const dispatchedByOrder = this.data.get('_dispatchedByOrder') || [];
        (dispatched[name] || (dispatched[name] = [])).push(args || null);
        dispatchedByOrder.push({name, args: args || null});
        this.data.set('_dispatched', dispatched);
        this.data.set('_dispatchedByOrder', dispatchedByOrder);

        let parentComponent = this.parentComponent;

        while (parentComponent) {
            const receiver = parentComponent.messages[name] || parentComponent.messages['*'];
            if (typeof receiver === 'function') {
                receiver.call(
                    parentComponent,
                    {target: this, value: args, name: name}
                );
                break;
            }

            parentComponent = parentComponent.parentComponent;
        }
    };
}
