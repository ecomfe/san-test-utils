import {
    SanComponent,
    ANode,
    LifeCycle,
    SanComponentConfig,
    ComponentConstructor,
    SanComponentLoader,
} from 'san';

import * as san from 'san';

interface IPrototype {
  prototype: any;
}
type ComponentWithPrototype = SanComponentConfig & IPrototype

interface LocalSan  {
  Component: ComponentConstructor<any, any>,
  SanComponent: SanComponent,
  SanComponentLoader: SanComponentLoader,
} 

interface LooseObject { [key: string]: any }

declare class VM<T> extends SanComponent<T> {
    name: string;
    componentName: string;
    aNode: ANode;
    children: SanComponent[];
    lifeCycle: typeof LifeCycle;
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



