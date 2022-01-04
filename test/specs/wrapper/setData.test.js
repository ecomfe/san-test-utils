/**
 * @file san test utils wrapper set data test file
 **/

import san from 'san';
import {describeWithShallowAndAttach} from '../../utils';
import componentWithSIf from '../../resources/component-with-s-if';
import componentWithWatch from '../../resources/component-with-watch';
import sinon from 'sinon';

/* global test */
describeWithShallowAndAttach('set data', attach => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(console, 'info').callThrough();
    });

    afterEach(() => {
        sandbox.reset();
        sandbox.restore();
    });

    test('sets component data and updates nested vm nodes when called on San instance', done => {
        const wrapper = attach(componentWithSIf);
        expect(wrapper.find('.child.ready').isVisible()).toEqual(false);
        wrapper.setData({ready: true});
        san.nextTick(() => {
            expect(wrapper.find('.child.ready').isVisible()).toEqual(true);
            done();
        });
    });

    test('keeps element in sync', done => {
        const wrapper = attach({
            initData() {
                return {
                    show: false
                };
            },
            template: '<div><div class="some-class" s-if="show"></div></div>'
        });
        wrapper.setData({show: true});
        san.nextTick(() => {
            const child = wrapper.find('.some-class');
            expect(child.el).toBeInstanceOf(Element);
            expect(child.classes()).toContain('some-class');
            done();
        });
    });

    test('runs watch function when data is updated', done => {
        const data1 = 'testest';
        const wrapper = attach(componentWithWatch);
        wrapper.setData({data1});
        san.nextTick(() => {
            expect(wrapper.vm.data.get('data2')).toEqual(data1);
            done();
        });
    });


    test('runs watch function after all data are updated', done => {
        const data1 = 'testest';
        const wrapper = attach(componentWithWatch);
        wrapper.setData({data1, data2: 'newData'});
        san.nextTick(() => {
            expect(console.info.args[0][0]).toEqual(data1);
            done();
        });
    });

    test('throw an error if called on a non vm wrapper', () => {
        const wrapper = attach({
            template: '<div><p /></div>'
        });
        const p = wrapper.find('p');
        const message = '[san-test-utils]: wrapper.setData() must be called on a San instance';
        const fn = () => p.setData({ready: true});
        expect(fn).toThrow(new Error(message));
    });

    test('updates watchers if computed is updated', done => {
        const testComponent = {
            template: '<em>{{computedText}}</em>',
            initData() {
                return {
                    text: '',
                    basket: []
                };
            },
            computed: {
                computedText() {
                    return this.data.get('text');
                }
            },
            inited() {
                this.watch('text', val => {
                    this.data.push('basket', this.data.get('computedText'));
                    console.log(this.data.get('basket'), 'www');
                });
            }
        };
        const wrapper = attach(testComponent);

        wrapper.setData({text: 'hello'});
        san.nextTick(() => {
            expect(wrapper.vm.data.get('basket')[0]).toEqual('hello');
            done();
        });
    });

    test('should not run watcher if data is null', done => {
        const testComponent = {
            template: `<div>
                <div s-if="!message">There is no message yet</div>
                    <div v-else>{{ reversedMessage }}</div>
                </div>
            `,
            initData() {
                return {
                    message: 'egassem'
                };
            },
            computed: {
                reversedMessage() {
                    const message = this.data.get('message') || '';
                    return message.split('').reverse().join('');
                }
            }
        };
        const wrapper = attach(testComponent);
        wrapper.setData({message: null});
        san.nextTick(() => {
            expect(wrapper.text()).toEqual('There is no message yet');
            done();
        });
    });

    test('updates an existing property in a data object', () => {
        const testComponent = {
            initData() {
                return {
                    anObject: {
                        propA: {
                            prop1: 'a'
                        },
                        propB: 'b'
                    }
                };
            },
            template: '<div />'
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            anObject: {
                propA: {
                    prop1: 'c'
                }
            }
        });
        expect(wrapper.vm.data.get('anObject.propB')).toEqual('b');
        expect(wrapper.vm.data.get('anObject.propA.prop1')).toEqual('c');
    });

    test('should append a new property to an object without removing existing properties', () => {
        const testComponent = {
            initData() {
                return {
                    anObject: {
                        propA: {
                            prop1: 'a'
                        },
                        propB: 'b'
                    }
                };
            },
            template: '<div />'
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            anObject: {
                propA: {
                    prop2: 'b'
                }
            }
        });
        expect(wrapper.vm.data.get('anObject.propA.prop1')).toEqual('a');
        expect(wrapper.vm.data.get('anObject.propA.prop2')).toEqual('b');
    });

    test('handles undefined values', done => {
        const testComponent = {
            template: `<div>
                {{undefinedProperty && undefinedProperty.foo}}
            </div>`,
            initData() {
                return {
                    undefinedProperty: undefined
                };
            }
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            undefinedProperty: {
                foo: 'baz'
            }
        });
        san.nextTick(() => {
            expect(wrapper.text()).toContain('baz');
            done();
        });
    });

    test('handles null values', done => {
        const testComponent = {
            template: '<div>{{nullProperty && nullProperty.foo}}</div>',
            initData() {
                return {
                    nullProperty: null
                };
            }
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            nullProperty: {
                foo: 'bar',
                another: null
            }
        });
        san.nextTick(() => {
            expect(wrapper.text()).toContain('bar');
            wrapper.setData({
                nullProperty: {
                    another: {
                        obj: true
                    }
                }
            });
            expect(wrapper.vm.data.get('nullProperty.another.obj')).toEqual(true);
            done();
        });
    });

    test('does not merge arrays', done => {
        const testComponent = {
            template: '<div>{{nested.nested.nestedArray[0]}}</div>',
            initData() {
                return {
                    items: [1, 2],
                    nested: {
                        nested: {
                            nestedArray: [1, 2]
                        }
                    }
                };
            }
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            items: [3]
        });
        expect(wrapper.vm.data.get('items')).toEqual([3]);
        wrapper.setData({
            nested: {
                nested: {
                    nestedArray: [10]
                }
            }
        });
        san.nextTick(() => {
            expect(wrapper.text()).toEqual('10');
            expect(wrapper.vm.data.get('nested.nested.nestedArray')).toEqual([10]);
            done();
        });
    });

    test('should set property in existing data object', done => {
        const testComponent = {
            initData() {
                return {
                    anObject: {
                        propA: 'a',
                        propB: 'b'
                    }
                };
            },
            computed: {
                anObjectKeys() {
                    return Object.keys(this.data.get('anObject')).join(',');
                }
            },
            template: '<div>{{anObjectKeys}}</div>'
        };
        const wrapper = attach(testComponent);
        wrapper.setData({
            anObject: {
                propC: 'c'
            }
        });
        san.nextTick(() => {
            expect(wrapper.vm.data.get('anObject.propA')).toEqual('a');
            expect(wrapper.vm.data.get('anObject.propB')).toEqual('b');
            expect(wrapper.vm.data.get('anObject.propC')).toEqual('c');
            expect(wrapper.vm.data.get('anObjectKeys')).toEqual('propA,propB,propC');
            expect(wrapper.html()).toEqual('<div>propA,propB,propC</div>');
            done();
        });
    });

    test('allows setting data of type Date synchronously', () => {
        const testComponent = {
            template: '<div>{{selectedDate}}</div>',
            initData() {
                return {
                    selectedDate: undefined
                };
            }
        };
        const testDate = new Date();
        const wrapper = attach(testComponent);
        wrapper.setData({selectedDate: testDate});
        expect(wrapper.vm.data.get('selectedDate')).toEqual(testDate);
    });
});
