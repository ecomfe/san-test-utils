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

export default function (type, options) {
    const [eventType, modifier] = type.split('-');
    const {
        eventInterface,
        cancelable,
        bubbles
    } = (eventTypes[eventType] || eventTypes.click);

    let event;
    if (typeof window.Event === 'function') {
        const EventInterface = typeof window[eventInterface] === 'function'
            ? window[eventInterface]
            : window.Event;
        event = new EventInterface(eventType, {
            ...options,
            bubbles,
            cancelable,
            keyCode: modifiers[modifier]
        });
    }
    else {
        event = document.createEvent('Event');
        event.initEvent(eventType, bubbles, cancelable);
        event.keyCode = modifiers[modifier];
    }

    const eventPrototype = Object.getPrototypeOf(event);
    Object.keys(options || {}).forEach(key => {
        const prototypeDescriptor = Object.getOwnPropertyDescriptor(eventPrototype, key);
        if (!prototypeDescriptor || prototypeDescriptor.setter !== undefined) {
            event[key] = options[key];
        }
    });
    return event;
}
