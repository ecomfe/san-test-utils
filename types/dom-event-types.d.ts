declare module 'dom-event-types' {
    interface EventTypes {
        eventInterface: string
        cancelable: boolean
        bubbles: boolean
    }

    let eventTypes: {[key: string]:EventTypes}
    export = eventTypes;
}
