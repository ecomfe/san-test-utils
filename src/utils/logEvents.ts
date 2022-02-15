/**
 * @file san test utils log events file
 **/

import san from 'san';
import {LooseObject} from '../../types';

const fire = san.Component.prototype.fire;
const dispatch = san.Component.prototype.dispatch;

export function addEventLogger(localSan: typeof san) {
    localSan.Component.prototype.fire = function (name: string, ...args: any[]) {;
        const fired = this.data.get('_fired') || {};
        const firedByOrder = this.data.get('_firedByOrder') || [];
        (fired[name] || (fired[name] = [])).push(args);
        firedByOrder.push({name, args});
        this.data.set('_fired', fired);
        this.data.set('_firedByOrder', firedByOrder);
        // @ts-ignore
        return fire.call(this, name, ...args);
    };

    localSan.Component.prototype.dispatch = function (name: string, args: LooseObject) {
        const dispatched = this.data.get('_dispatched') || {};
        const dispatchedByOrder = this.data.get('_dispatchedByOrder') || [];
        (dispatched[name] || (dispatched[name] = [])).push(args || null);
        dispatchedByOrder.push({name, args: args || null});
        this.data.set('_dispatched', dispatched);
        this.data.set('_dispatchedByOrder', dispatchedByOrder);
        return dispatch.call(this, name, args);
    };
}
