/**
 * @file san test utils mount options test file
 **/

import {describeWithMountingMethods} from '../../utils';
import config from '../../../src/config';

/* global test jest */
describeWithMountingMethods('options.methods', (mount, methodName) => {
    it('prioritize mounting options over config', () => {
        config.methods.val = () => 'methodFromConfig';

        const testComponent = {
            template: '<div>{{val()}}</div>'
        };

        const wrapper = mount(testComponent, {
            methods: {
                val() {
                    return 'methodFromOptions';
                }
            }
        });
        const HTML = methodName === 'renderToString' ? wrapper : wrapper.html();
        expect(HTML).toContain('methodFromOptions');
    });
});
