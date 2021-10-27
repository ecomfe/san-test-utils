import {SanComponent, ANode, LifeCycle} from 'san';

type LooseObject = {[key: string]: any}

class VM<T> extends SanComponent<T> {
    super()
    name: string
    aNode: ANode
    componentName: string
    children: SanComponent[]
    lifeCycle: typeof LifeCycle
}

type SelectorWithRef = {
    ref: string
}

type SelectorValue = Function | string | Element | SelectorWithRef

type Selector = {
    type: string
    value: SelectorValue
}

interface WrapperElement extends Element {
    checked?: boolean
    selected?: boolean
    value?: string
}

interface WrapperHTMLElement extends HTMLElement {
    checked?: boolean
    selected?: boolean
    value?: string
}