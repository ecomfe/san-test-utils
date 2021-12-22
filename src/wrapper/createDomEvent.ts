/**
 * @file san test utils create dom event file
 **/

import eventTypes from 'dom-event-types';

const modifiers = {
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34
};

type Modifier = keyof typeof modifiers

export default function (type: string, options?: {[key: string]: any}) {
    const [eventType, modifier] = type.split('-');
    const {
        eventInterface,
        cancelable,
        bubbles
    } = (eventTypes[eventType] || eventTypes.click);

    let event: any;
    if (typeof window.Event === 'function') {
        const EventInterface = typeof window[eventInterface as any] === 'function'
            ? window[eventInterface as keyof Window]
            : window.Event;
        event = new EventInterface(eventType, {
            ...options,
            bubbles,
            cancelable,
            keyCode: modifiers[modifier as Modifier]
        });
    }
    else {
        event = document.createEvent('Event');
        event.initEvent(eventType, bubbles, cancelable);
        event.keyCode = modifiers[modifier as Modifier];
    }

    const eventPrototype = Object.getPrototypeOf(event);
    Object.keys(options || {}).forEach(key => {
        const prototypeDescriptor = Object.getOwnPropertyDescriptor(eventPrototype, key) as any;
        if ((!prototypeDescriptor || prototypeDescriptor.setter !== undefined) && options) {
            event[key] = options[key as keyof Event];
        } 
    });
    return event;
}
