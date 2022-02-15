import {ANode, LifeCycleStage, ComponentDefineOptions, Component, ComponentLoader, Expr, DataChangeListener, ComponentDefineOptionMessages} from 'san';

import * as san from 'san';

interface LooseObject {
    [key: string]: any;
}

declare class VM<T> extends Component<T> {
    name: string;
    componentName: string;
    aNode: ANode;
    children: VM[];
    lifeCycle: LifeCycleStage;
    super();
}

interface SelectorWithRef {
    ref: string;
}

type SelectorValue = function | string | Element | SelectorWithRef;

interface Selector {
    type: string;
    value: SelectorValue;
}

interface WrapperElement extends Element {
    checked?: boolean;
    selected?: boolean;
    value?: string;
}

interface WrapperHTMLElement extends HTMLElement {
    checked?: boolean;
    selected?: boolean;
    value?: string;
}

interface SlotObject {
    slotId?: string;
    type?: string;
    component?: string | function | object;
    template?: string;
}

type BasicOptions = function | LooseObject[] | LooseObject;

interface MergedComponentOptions {
    stubs: BasicOptions;
    data: BasicOptions;
    methods: BasicOptions;
    attachToDocument?: boolean;
    slots?: any;
}

interface NewAProperty extends san.AProperty {
    expr: NewExpr;
    raw: string;
}

interface NewExpr extends Expr {
    paths: Array<any>;
    value?: any;
}
