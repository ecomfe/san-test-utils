/**
 * @file san test utils attach options test file
 **/

import {describeWithAttachingMethods} from '../../utils';
import config from '../../../src/config';

/* global test jest */
describeWithAttachingMethods('options.methods', (attach, methodName) => {
    it('prioritize attaching options over config', () => {
        config.methods.val = () => 'methodFromConfig';

        const testComponent = {
            template: '<div>{{val()}}</div>'
        };

        const wrapper = attach(testComponent, {
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
