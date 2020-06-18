/**
 * @file san test utils shallow mount file
 **/

import mount from './mount';
import {getNewComponent} from './utils/createComponent';
import {createAllStubComponents} from './utils/createComponentStubs';

export default function (component, options = {}) {
    const stubbedComponents = createAllStubComponents(component);
    const newComponent = getNewComponent(component);

    newComponent.components = stubbedComponents;
    return mount(newComponent, options);
}
