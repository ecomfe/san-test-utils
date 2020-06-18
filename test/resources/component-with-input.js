/**
 * @file san test utils resource component
 **/

import san from 'san';

export default san.defineComponent({
    initData() {
        return {
            checkboxVal: [],
            textVal: undefined,
            textareaVal: undefined,
            radioVal: undefined,
            selectVal: undefined,
            counter: 0
        };
    },
    inited() {
        this.watch('checkboxVal', val => {
            let counter = this.data.get('counter');
            this.data.set('counter', ++counter);
        });
        this.watch('radioVal', val => {
            let counter = this.data.get('counter');
            this.data.set('counter', ++counter);
        });
    },
    template: `<div>
        <input type="checkbox" checked="{=checkboxVal=}" value="test" />
        <input type="radio" value="radioFooResult" id="radioFoo" checked="{=radioVal=}" />
        <input type="radio" value="radioBarResult" id="radioBar" checked="{=radioVal=}" />
        <input type="text" value="{=textVal=}" />
        <textarea value="{=textareaVal=}" />

        <select value="{=selectVal=}">
            <option value="selectA"></option>
            <option value="selectB"></option>
            <option value="selectC"></option>
        </select>
        <select value="{=selectVal=}" class="with-optgroups">
            <optgroup label="Group1">
                <option value="selectA"></option>
                <option value="selectB"></option>
            </optgroup>
            <optgroup label="Group2">
                <option value="selectC"></option>
            </optgroup>
        </select>
        <label id="label-el"></label>

        <span class="checkboxResult" s-if="checkboxVal.length">checkbox checked</span>
        <span class="counter">{{counter}}</span>
        {{textVal}}
        {{selectVal}}
        {{radioVal}}
    </div>`
});
